import {getUserIdFromToken} from "../utils/utils.js";
import Like from "../models/likeSchema.js";
export const toggleLike = async(req, res) => {

    const userId = getUserIdFromToken(req);
    const itemId = req.params.itemId;
    const itemType = req.params.type;

    console.log(itemId)

    try{
        const existingLike = await Like.findOne({ user: userId, [itemType]: itemId })
        console.log(existingLike)

        if(existingLike) {
            console.log(existingLike._id)

            await Like.findByIdAndRemove(existingLike._id);
            return res.status(200).json({message: 'Like remove'})
        }else{
            const like = new Like({
                user: userId,
                type: itemType,
                [itemType]: itemId
            })

            await like.save();

            return res.status(200).json({
                data: like,
                message: 'Like ajouté avec succès'
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message: 'Impossible d\'ajouter un like'})
    }
}