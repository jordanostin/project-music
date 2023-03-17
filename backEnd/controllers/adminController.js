import userSchema from "../models/userSchema.js";
import musicSchema from "../models/musicSchema.js";
import comSchema from "../models/comSchema.js";

export const admin = async (req,res) => {

    try{
        const users = await userSchema.find({});
        const musics = await musicSchema.find({});
        const comments = await comSchema.find({});


        res.status(200).json({users, musics, comments});

    }catch(err){
        console.log(err);
    }
}