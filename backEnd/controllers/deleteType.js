import Comment from "../models/comSchema.js";
import Music from "../models/musicSchema.js";
import User from "../models/userSchema.js";

export const deleteType = async (req,res) => {
    
    let type = '';
    
    switch(req.params.type){
        case 'user': type = User; break
        case 'music': type = Music; break
        case 'comment': type = Comment; break
    }
    
    const id = req.params.id

    try {
        await type.findByIdAndDelete(id);
        console.log("Successful deletion");
    } catch (err) {
        console.log(err);
    }

    res.status(200).json({message: 'succesful delete'})
}