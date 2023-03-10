import Comment from "../models/comSchema.js";
import Music from "../models/musicSchema.js";
import User from "../models/userSchema.js";
import { getUserIdFromToken } from "../utils/utils.js";
import fs from "fs"

export const deleteType = async (req,res) => {
    
    let type = '';
    
    switch(req.params.type){
        case 'user': type = User; break
        case 'music': type = Music; break
        case 'comment': type = Comment; break
    }
    
    const id = req.params.id;

    try {
        const userId = getUserIdFromToken(req);
        const item = await type.findById(id)
        
        if(!item){ 
            return res.status(400).json({message: 'Element introuvable'})
        };

        if(item.user.toString() !== userId){
            return res.status(500).json({message: 'Vous ne pouvez pas supprimer ce fichier'})
        }

        fs.unlink(`public/${item.audio}`, (err) => {
            if (err) {
                return res.status(500).json({message: 'Erreur lors de la suppression du fichier audio'})
            }
            
            if(!item.image){
                return res.status(200).json({message: 'Suppression réussi'})
            }else{
                fs.unlink(`public/${item.image}`, (err) => {
                    if (err) {
                        return res.status(500).json({message: 'Erreur lors de la suppression du fichier image'})
                    }
                    return res.status(200).json({message: 'Suppression réussi'})
                });
            }
        });

        await type.findByIdAndDelete(id);
        
    } catch (err) {
        return res.status(400).json({message: 'Erreur'});
    }
}