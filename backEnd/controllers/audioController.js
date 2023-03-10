import musicSchema from '../models/musicSchema.js';
import formidable from 'formidable';
import { getUserIdFromToken } from '../utils/utils.js';
import fs from 'fs'

export const uploadAudio = async(req, res) => {

    const userId = getUserIdFromToken(req);

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
        }

        const audioOldPath = files.audio.filepath;
        const audioNewPath = 'audio/'+files.audio.originalFilename.replace(/ /g, '_');

        const allowedExtensions = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];

        if (!allowedExtensions.includes(files.audio.mimetype)) {
            return res.status(400).json({ message: 'Le fichier audio doit être de type .mp3, .wav, .mepg ou .ogg' });
        }

        let imageNewPath;
        if(files.image){

            if(files.image.length){
                return res.status(500).json({message : 'Vous pouvez ajouter qu\'une seule image'})
            };

            const imageOldPath = files.image.filepath;
            imageNewPath = 'image/'+files.image.originalFilename.replace(/ /g, '_');

            const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!allowedExtensions.includes(files.image.mimetype)) {
                return res.status(400).json({ message: 'L\'image doit être de type .jpeg, .png, .jpg' });
            }

            fs.copyFile(imageOldPath, 'public/'+imageNewPath, (err) => {
                if(err){
                    return res.status(400).json({message: 'Une erreur est survenue au chargement de l\'image'});
                }
            })
        }

        fs.copyFile(audioOldPath, 'public/'+audioNewPath, (err) => {

            if(err){
                return res.status(400).json({message: 'Une erreur est survenue au chargement de l\'audio'});
            }else{
                
                const music = new musicSchema({
                    user: userId,
                    name,
                    description,
                    audio: audioNewPath,
                    image: imageNewPath,
                    createdAt: Date.now()
                })
        
                music.save()
                .then(() =>{
                    return res.status(201).json({music})
                })
                .catch((err) => {
                    return res.status(400).json({message : 'une erreur est survenue'})
                })
            };
        });
    });
};





export const updateAudio = (req, res) => {

    const userId = getUserIdFromToken(req);

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files)=>{

        const musicId = req.params.id;

        const {name, description} = fields;

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
            let imageNewPath;
            const imageOldPath = files.image.filepath;
            imageNewPath = 'image/' + files.image.originalFilename.replace(/ /g, '_');

            fs.copyFile(imageOldPath, 'public/' + imageNewPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Une erreur est survenue' });
                } else {
                    musicSchema.findById(musicId).exec()
                        .then((music) => {
                            if (!music) {
                                return res.status(404).json({ message: 'Musique non trouvée' });
                            } else {
                                const oldImagePath = music.image;
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
                                            updatedAt: music.updatedAt
                                        };
                                        musicSchema.updateOne({ _id: musicId }, music)
                                            .then(() => {
                                                return res.status(200).json({ music });
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
                }
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