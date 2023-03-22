import userSchema from "../models/userSchema.js";
import musicSchema from "../models/musicSchema.js";
import comSchema from "../models/comSchema.js";
import playlistSchema from "../models/playlistSchema.js";

export const user = async (req,res) => {

    try{
        const users = await userSchema.find({});
        const musics = await musicSchema.find({});
        const comments = await comSchema.find({});
        const playlists = await playlistSchema.find({});


        res.status(200).json({users, musics, comments, playlists});

    }catch(err){
        console.log(err);
    }
}