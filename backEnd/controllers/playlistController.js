import playlistSchema from '../models/playlistSchema.js';
import Playlist from '../models/playlistSchema.js';
import User from '../models/userSchema.js'

export const createPlaylist = async(req, res) => {

    const userId = req.userId;
    const {name} = req.body

    try{
        const playlist = new playlistSchema({
            user: userId,
            name: name,
            music:[]
        });
        
        playlist.save()
        return res.status(201).json({
            playlist,
        });
    }
    catch{
        return res.status(500).json({message: 'Erreur lors de la création de la playlist'})
    }
    
}

export const getUserPlaylist = async(req, res) => {

    const userId = req.userId;

    try{
        const user = await User.findById(userId)

        const playlists = await Playlist.find({user: user._id});

        return res.status(200).json(playlists)
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}

export const addMusicPlaylist = async(req, res) => {

    const userId = req.userId;

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

