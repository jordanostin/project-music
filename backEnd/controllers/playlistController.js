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

export const deleteMusicPlaylist = async(req, res) => {
    try {
        const { playlistId, musicId } = req.params;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(400).json({ message: 'Playlist introuvable' });
        }

        const musicIndex = playlist.musics.findIndex(
            (music) => music._id.toString() === musicId
        );

        if (musicIndex === -1) {
            return res.status(400).json({ message: 'Musique introuvable dans la playlist' });
        }

        playlist.musics.splice(musicIndex, 1);

        await playlist.save();

        return res.json({
            message: 'Musique supprimée de la playlist avec succès',
            playlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const showPlaylist = async(req, res) => {
    const {playlistId} = req.params;

    try{
        const playlist = await Playlist.findById(playlistId).populate('musics');
        if(!playlist){
            return res.status(400).json({message: 'Playlist introuvable'})
        }
        return res.status(200).json(playlist);
    } catch (err) {
        return res.status(500).json({message: 'Erreur lors de la recherche de la playlist'})
    }
}

