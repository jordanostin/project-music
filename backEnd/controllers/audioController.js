import musicSchema from '../models/musicSchema.js';
import formidable from 'formidable';
import path from 'path';

export const uploadAudio = (req, res) => {

    const form = formidable({ 
        multiples: true,
        uploadDir: path.join(path.dirname(new URL(import.meta.url).pathname), '../uploads'),
        keepExtensions: true
    });
  
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Erreur de traitement du formulaire' });
        }
    
        const { name, description } = fields;
        const image = files.image;
        const audio = files.audio;
    
        if (!audio) {
            return res.status(400).json({ message: 'Aucun fichier audio sélectionné' });
        }
    
        const music = new musicSchema({
            name,
            description,
            image: image ? `/image/${image.name}` : '',
            audio: audio ? `/audio/${audio.name}` : '',
        });
  
        music.save()
        .then(() => {
            res.status(201).json({
                music: {
                    id: music._id,
                    name,
                    description,
                    image: music.image,
                    audio: music.audio,
                },
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({ message: 'Une erreur est survenue lors de l\'enregistrement de la musique' });
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