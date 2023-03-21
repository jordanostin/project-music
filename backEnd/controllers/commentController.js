import Comment from '../models/comSchema.js';
import Music from '../models/musicSchema.js';
import User from '../models/userSchema.js'

export const createComment = async(req, res) => {

    const userId = req.userId;
    const {type, itemId} = req.params
    const {content} = req.body;

    const user = await User.findOne({ _id: userId });

    console.log(user)

    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const comment = new Comment({
        user: userId,
        userName: user.name,
        type: type,
        itemId: itemId,
        content,
        createdAt: Date.now(),
    });

    try{
        await comment.save();

        const music = await Music.findById(itemId).populate('comments');
        music.comments.push(comment);

        await music.save();


        return res.status(200).json({
            music
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