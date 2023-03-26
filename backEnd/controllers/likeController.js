import Like from "../models/likeSchema.js";
import Music from "../models/musicSchema.js";
export const toggleLike = async(req, res) => {

    const userId = req.userId;
    const itemId = req.params.itemId;
    const itemType = req.params.type;

    let like;

    try{
        const existingLike = await Like.findOne({ user: userId, [itemType]: itemId });

        if (!existingLike) {
            like = new Like({
                user: userId,
                type: itemType,
                [itemType]: itemId
            });

            if (itemType === 'music') {
                like.isLiked = true;
            }

            await like.save();

            return res.status(200).json(like);
        } else {
            like = new Like({
                user: userId,
                type: itemType,
                isLiked: !existingLike.isLiked,
                [itemType]: itemId
            });

            await Like.findByIdAndRemove(existingLike._id);
            await like.save();

            if (like.isLiked) {
                return res.status(200).json(like);
            } else {
                return res.status(200).json(like);
            }
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message: 'Impossible d\'ajouter un like'});
    }
}



export const verifyLike = async(req, res) => {

    try {
        const musicId = req.params.musicId;
        const userId = req.userId;

        const music = await Music.findById(musicId);



        if (!music) {
            return res.status(404).json({ message: 'Musique introuvable' });
        }

        const like = await Like.findOne({ user: userId, music: musicId });

        if (!like) {
            return res.status(200).json({
                music: music,
                isLiked: false
            })
        }

        if(!like.isLiked){
            return res.status(200).json({
                music: music,
                isLiked: false
            })
        }

        return res.status(200).json({
            music: music,
            isLiked: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
}


