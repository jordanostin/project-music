import Comment from '../models/comSchema.js';

export const createComment = async(req, res) => {

    const userId = req.userId;
    const {type, itemId} = req.params
    const {content} = req.body;

    const comment = new Comment({
        user: userId,
        type: type,
        itemId: itemId,
        content,
        createdAt: Date.now(),
    });

    try{
        await comment.save();
        return res.status(200).json({
            comment: comment
        });
    }catch(err){
        return res.status(400).json({
            message: 'Probleme pendant le post du commentaire',
            error: err
        });
    }
}

export const updateComment = async (req, res) => {

    const userId = req.userId;
    const commentId = req.params.id;
    const {content} = req.body;

    try{
        const comment = {
            user: userId,
            content,
        }

        Comment.updateOne({_id: commentId}, comment)
            .then(() => {
                return res.status(200).json({ comment});
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ message: 'Erreur de la mise à jour' });
            });
    }catch (err){
        return res.status(400).json({message: err.message})
    }
}