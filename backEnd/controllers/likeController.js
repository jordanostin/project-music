import {getUserIdFromToken} from "../utils/utils.js";
import Like from "../models/likeSchema.js";
export const addlike = async(req, res) => {

    const userId = getUserIdFromToken(req);
    const itemId = req.params.itemId;

    console.log(userId, itemId)

    try{
        const existingLike = await Like.findOne({ user: userId, itemId })
        if(existingLike){
            return res.status(400).json({message: 'Vous avez déjà liker cet élément'})
        }

        console.log(existingLike)

        const like = new Like({
            user: userId,
            itemId
        })

        await like.save();

        return res.status(200).json({
            data: like,
            message: 'Like ajouté avec succès'
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message: 'Impossible d\'ajouter un like'})
    }

}

export const removeLike = async(req, res) => {

    const userId = getUserIdFromToken(req);
    const {type, itemId} = req.params;

    try{
        const existingLike = Like.findOne({ user: userId, type, itemId })
        if(existingLike){
            return res.status(400).json({message: 'Vous avez déjà liker cet élément'})
        }

        await Like.findByIdAndDelete(existingLike._id)

        return res.status(200).json({message: 'Like supprimé avec succès'})
    }
    catch{
        return res.status(400).json({message: 'Impossible d\'ajouter un like'})
    }
}