import musicSchema from '../models/musicSchema.js';
import formidable from 'formidable';
import fs from 'fs'

export const uploadAudio = async(req, res) => {

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files)=>{

        if(err){
            res.status(500).json({message:'Une erreur est survenue'});
        }

        const {name, description} = fields;

        if (!files.audio) {
            return res.status(400).json({ message: 'Il manque un fichier audio' });
        }

        const audioOldPath = files.audio.filepath;
        const audioNewPath = 'audio/'+files.audio.originalFilename.replace(/ /g, '_');

        let imageNewPath;
        if(files.image){
            const imageOldPath = files.audio.filepath;

            imageNewPath = 'image/'+files.image.originalFilename.replace(/ /g, '_');

            fs.copyFile(imageOldPath, 'public/'+imageNewPath, (err) => {
                if(err){
                    res.status(400).json({message: 'Une erreur est survenue au chargement de l\'image'});
                }
            })
        }

        fs.copyFile(audioOldPath, 'public/'+audioNewPath, (err) => {

            if(err){
                res.status(400).json({message: 'Une erreur est survenue au chargement de l\'audio'});
            }else{
                
                const music = new musicSchema({
                    name,
                    description,
                    audio: audioNewPath,
                    image: imageNewPath,
                    createdAt: Date.now()
                })
        
                music.save()
                .then(() =>{
                    res.status(201).json({music})
                })
                .catch((err) => {
                    return res.status(400).json({message : 'une erreur est survenue'})
                })
            };
        });
    });
};
  

export const updateAudio = (req, res) => {

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files)=>{

        const musicId = req.params.id;

        const {name, description} = fields;

        
        if(!files.image){
            const update = {
                name,
                description,
                updatedAt: Date.now()
            };
            musicSchema.updateOne({ _id: musicId }, update)
                .then(() => {
                    res.status(200).json({ update });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: 'Erreur de la mise à jour' });
                });
        }else{
            let imageNewPath;
            const imageOldPath = files.image.filepath;
            imageNewPath = 'image/' + files.image.originalFilename.replace(/ /g, '_');

            fs.copyFile(imageOldPath, 'public/' + imageNewPath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                } else {
                    musicSchema.findById(musicId).exec()
                        .then((music) => {
                            if (!music) {
                                res.status(404).json({ message: 'Musique non trouvée' });
                            } else {
                                const oldImagePath = music.image;
                                fs.unlink(`public/${oldImagePath}`, (err) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).json({ message: 'Erreur de la suppression de l\'ancienne image' });
                                    } else {
                                        const update = {
                                            name,
                                            description,
                                            image: imageNewPath,
                                            updatedAt: music.updatedAt
                                        };
                                        musicSchema.updateOne({ _id: musicId }, update)
                                            .then(() => {
                                                res.status(200).json({ update });
                                            })
                                            .catch((err) => {
                                                console.error(err);
                                                res.status(500).json({ message: 'Erreur de la mise à jour' });
                                            });
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: 'Erreur de la mise à jour' });
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
            const file = music.audio;
            res.download(file);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({message: 'Erreur de téléchargement'});
        });
};