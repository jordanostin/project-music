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
        const imageOldPath = files.audio.filepath;

        const audioNewPath = 'audio/'+files.audio.originalFilename;

        let imageNewPath = null;
        if(files.image){
            imageNewPath = 'image/'+files.image.originalFilename;
        }

        fs.copyFile(audioOldPath, 'public/'+audioNewPath, (err) => {

            if(err){
                res.status(400).json({message: 'Une erreur est survenue'});
            }else{
                fs.copyFile(imageOldPath, 'public/'+imageNewPath, (err) => {
                    if(err){
                        res.status(400).json({message: 'Une erreur est survenue'});
                    }else{
                        const music = new musicSchema({
                            name,
                            description,
                            audio: audioNewPath,
                            image: imageNewPath
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
            };
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