import playlistSchema from '../models/playlistSchema.js'
import { getUserIdFromToken} from '../utils/utils.js'

export const createPlaylist = async(req, res) => {

    const userId = getUserIdFromToken(req);
    const {name} = req.body

    try{
        const playlist = new playlistSchema({
            user: userId,
            name: name,
            music:[]
        });
        
        playlist.save()
        return res.status(201).json({
            success: true,
            message: 'Playlist créée avec succès',
            data: playlist,
        });
    }
    catch{
        return res.status(500).json({message: 'Erreur lors de la création de la playlist'})
    }
    
}

