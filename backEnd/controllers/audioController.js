import musicSchema from '../models/musicSchema.js';
import formidable from 'formidable';
import fs from 'fs';

export const uploadAudio = (req, res) => {
    const form = formidable({multiples: true})

    form.parse(req, (err, fields, files) => {


        if (err) {
        return res.status(400).json({ message: 'une erreur est survenue' });
        }

        const {name, description} = fields;
        const {image, audio} = files;

        if(!audio || !image){
            return res.status(400).json({message : 'selectionne un fichier audio et image'})
        }

        const audioPath = audio.path;
        const imagePath = image.path;

        if (!fs.existsSync(audioPath)) {
            return res.status(400).json({ message: 'le fichier audio est introuvable' });
        }
        if (!fs.existsSync(imagePath)) {
            return res.status(400).json({ message: 'le fichier image est introuvable' });
        }

        fs.rename(audioPath, `./uploads/audio/${audio.name}`, (err) => {
            if(err){
                return res.status(400).json({message : 'il y a une erreur pour l\'enregistrement de l\'audio'})
            }

            fs.rename(imagePath, `./uploads/image/${image.name}`, (err) => {
                if(err){
                    return res.status(400).json({message : 'il y a une erreur pour l\'enregistrement de l\'image'})
                }

                const music = new musicSchema({
                    name,
                    description,
                    image: `./uploads/image/${image.name}`,
                    audio: `./uploads/audio/${audio.name}`,
                });

                music.save()
                .then(() => {
                    res.status(201).json({
                        music:{
                            id: music._id,
                            name,
                            description,
                            image: `./uploads/image/${image.name}`,
                            audio: `./uploads/audio/${audio.name}`,
                        }
                    });
                })
                .catch(err => {
                    res.status(400).json({message: 'il y a une erreur pour l\'enregistrement de la musique'})
                })
            });
        });
    });
};

export const updateAudio = (req, res) => {

    const musicId = req.params.id;

    const update = {
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        audio: req.boy.audio
    };

  
    musicSchema.updateOne({ _id: musicId }, update)
        .then(() => {
        res.status(200).json({update})
        })
        .catch((err) => {
        console.error(err);
        res.status(500).json({message: 'Erreur de la mise à jour'});
        });
    
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