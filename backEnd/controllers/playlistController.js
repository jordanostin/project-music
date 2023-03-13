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

export const addMusicPlaylist = async(req, res) => {

    const userId = getUserIdFromToken(req);

    try {
        
        const playlistId = req.params.playlistId;
        const musicId = req.params.musicId;
    
        const playlist = await playlistSchema.findOneAndUpdate(
            { _id: playlistId, user: userId },
            { $addToSet: { musics: musicId } },
            { new: true }
        ).populate('musics');
    
        if (!playlist) {
          return res.status(400).json({message: 'Impossible d\'ajouter la musique à la playlist'});
        }
    
        return res.status(200).json({
            message: 'Musique ajoutée à la playlist avec succès',
            data: playlist
        });
      } catch (error) {
        return res.status(500).json({
            message: "Impossible d'ajouter la musique à la playlist",
            error: error.message
        });
      }
}

