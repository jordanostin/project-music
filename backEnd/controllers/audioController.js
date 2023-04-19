import musicSchema from '../models/musicSchema.js';
import formidable from 'formidable';
import { copyFiles } from '../utils/utils.js';
import fs from 'fs';


export const uploadAudio = async(req, res) => {

    const userId = req.userId;

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files)=>{

        if(err){
           return res.status(500).json({message:'Une erreur est survenue'});
        }

        const {name, description} = fields;

        if (!files.audio) {
            return res.status(400).json({ message: 'Il manque un fichier audio ou fichier non supporté' });
        };

        if(files.audio.length){
            return res.status(500).json({message : 'Vous pouvez ajouter qu\'un seul fichier audio'})
        };

        const allowedExtensions = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];

        if (!allowedExtensions.includes(files.audio.mimetype)) {
            return res.status(400).json({ message: 'Le fichier audio doit être de type .mp3, .wav, .mepg ou .ogg' });
        };

        let imagePaths;
        if(files.image){

            if(files.image.length){
                return res.status(500).json({message : 'Vous pouvez ajouter qu\'une seule image'})
            };

            const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!allowedExtensions.includes(files.image.mimetype)) {
                return res.status(400).json({ message: 'L\'image doit être de type .jpeg, .png, .jpg' });
            }

            try {
                imagePaths = await copyFiles([files.image], 'image');
            } catch (err) {
                return res.status(400).json({message: 'Une erreur est survenue au chargement de l\'image'});
            }
        }

        try {
            const audioPaths = await copyFiles([files.audio], 'audio');
            const music = new musicSchema({
                user: userId,
                name,
                description,
                audio: audioPaths[0],
                image: imagePaths ? imagePaths[0] : null,
                createdAt: Date.now()
            });
            await music.save();
            return res.status(201).json({music});
        } catch (err) {
            return res.status(400).json({message : 'une erreur est survenue'})
        };
    });
};





export const updateAudio = async(req, res) => {

    const userId = req.userId;

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files)=>{

        const musicId = req.params.id;

        const {name, description} = fields;

        if(!name || !description){
            return res.status(400).json({message : 'Les champs sont vide'})
        }

        if(!files.image){
            const music = {
                user: userId,
                name,
                description,
                updatedAt: Date.now()
            };
            musicSchema.updateOne({ _id: musicId }, music)
                .then(() => {
                    return res.status(200).json({ music });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({ message: 'Erreur de la mise à jour' });
                });
        }else{
            copyFiles([files.image], 'image')
                .then(([imageNewPath]) => {
                    musicSchema.findById(musicId).exec()
                        .then((data) => {
                            if (!data) {
                                return res.status(404).json({ message: 'Musique non trouvée' });
                            } else {
                                const oldImagePath = data.image;
                                fs.unlink(`public/${oldImagePath}`, (err) => {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json({ message: 'Erreur de la suppression de l\'ancienne image' });
                                    } else {
                                        const music = {
                                            user: userId,
                                            name,
                                            description,
                                            image: imageNewPath,
                                            updatedAt: data.updatedAt
                                        };
                                        musicSchema.updateOne({ _id: musicId }, music)
                                            .then(() => {
                                                return res.status(200).json({ music});
                                            })
                                            .catch((err) => {
                                                console.error(err);
                                                return res.status(500).json({ message: 'Erreur de la mise à jour' });
                                            });
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({ message: 'Erreur de la mise à jour' });
                        });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ message: 'Erreur de la mise à jour' });
                });
        }
    })
}



export const downloadAudio = (req, res) => {

    const musicId = req.params.id;

    musicSchema.findById(musicId)
        .then((music) => {
            
            const file = `public/${music.audio}`;
            return res.download(file);
        })
        .catch((err) => {
            
            return res.status(500).json({message: 'Erreur de téléchargement'});
        });
};

export const showMusic = async(req, res) => {
    const musicId = req.params.musicId

    try {
        const music = await musicSchema.findById(musicId);

        if (!music) {
            return res.status(400).json({message: 'Musique introuvable'})
        }

        return res.status(200).json({music})
    } catch(err) {
        return res.status(500).json({message: 'Une erreur est survenue'})
    }
}

export const latestMusic = async (req, res) => {
    try {
        const latestMusic = await musicSchema.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(latestMusic);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching latest music" });
    }
};