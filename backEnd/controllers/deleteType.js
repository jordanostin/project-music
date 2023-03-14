import Comment from "../models/comSchema.js";
import Music from "../models/musicSchema.js";
import User from "../models/userSchema.js";
import Playlist from "../models/playlistSchema.js";
import { getUserIdFromToken } from "../utils/utils.js";
import fs from "fs";


export const deleteType = async (req,res) => {
    
    let type = '';
    
    switch(req.params.type){
        case 'user': type = User; break
        case 'music': type = Music; break
        case 'comment': type = Comment; break
        case 'playlist': type = Playlist; break
    }
    
    const id = req.params.id;

    try {
        const userId = getUserIdFromToken(req);
        const user = await User.findById(userId);
        const isAdmin = user.isAdmin;
        const item = await type.findById(id);

        if(type === User){
            if(!item){
                return res.status(400).json({message: 'Element introuvable'})
            }
            await User.findByIdAndDelete(id);
            return res.status(200).json({message: 'Utilisateur supprimé'})
        }

        if(type === Playlist){
            if(!item){
                return res.status(400).json({message: 'Element introuvable'})
            }
            await Playlist.findByIdAndDelete(id);
            return res.status(200).json({message: 'Playlist supprimé'})
        }

        if(type === Comment){
            if(!item){
                return res.status(400).json({message: 'Element introuvable'})
            }
            await Comment.findByIdAndDelete(id);
            return res.status(200).json({message: 'Commentaire supprimé'})
        }

        if(type === Music){
            if(!item){
                return res.status(400).json({message: 'Element introuvable'})
            }

            if(item.user.toString() !== userId && !isAdmin){
                return res.status(500).json({message: 'Vous ne pouvez pas supprimer ce fichier'})
            }

            fs.unlink(`public/${item.audio}`, (err) => {
                if (err) {
                    return res.status(500).json({message: 'Erreur lors de la suppression du fichier audio'})
                }

                if(!item.image){
                    return res.status(200).json({message: 'Music supprimé'})
                }else{
                    fs.unlink(`public/${item.image}`, (err) => {
                        if (err) {
                            return res.status(500).json({message: 'Erreur lors de la suppression du fichier image'})
                        }
                        return res.status(200).json({message: 'Musique supprimé'})
                    });
                }
            });
        }

        await type.findByIdAndDelete(id);
        
    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Erreur'});
    }
}