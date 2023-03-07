import musicSchema from '../models/musicSchema.js';

export const uploadAudio = (req, res) => {

    const {name, description } = req.body;

    if(req.file){
        const image = req.file.path;
        const audio = req.file.path;
    
        const music = new musicSchema({
            name,
            description,
            image,
            audio
        });
    
        music.save()
        .then(() => {
            res.status(201).json({
                product:{
                    id: music._id,
                    name,
                    description,
                    image,
                    audio,
                }
            });
        })
        .catch((err) => {
            return res.status(400).json({message : 'une erreur est survenue'})
        });
    }else{
        return res.status(400).json({message : 'Aucun fichier audio sélectionné'})
    }
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