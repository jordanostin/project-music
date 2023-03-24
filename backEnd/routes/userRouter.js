import express from 'express';
import { downloadAudio, updateAudio, uploadAudio} from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';
import {
    addMusicPlaylist,
    createPlaylist,
    deleteMusicPlaylist,
    getUserPlaylist,
    showPlaylist
} from '../controllers/playlistController.js';
import {toggleLike, verifyLike} from "../controllers/likeController.js";
import {createComment, updateComment} from "../controllers/commentController.js";
import {user} from "../controllers/userController.js";

const router = express.Router();

router.post('/upload', uploadAudio);
router.post('/create-playlist', createPlaylist);
router.post('/playlist/:playlistId/musics/:musicId', addMusicPlaylist);
router.post('/:type/:itemId/toggleLike', toggleLike);
router.post('/comment/:type/:itemId', createComment);

router.get('/verify-token', verifyToken);
router.get('/download/:id', downloadAudio);
router.get('/home', user);
router.get('/playlist/user', getUserPlaylist);
router.get('/playlist/:playlistId', showPlaylist)
router.get('/music/:musicId', verifyLike)

router.delete('/delete/:type/:id', deleteType);
router.delete('/delete/playlist/:playlistId/music/:musicId', deleteMusicPlaylist)

router.put('/update/user/:id', updateUser);
router.put('/update/audio/:id', updateAudio);
router.put('/update/comment/:id', updateComment)

export default router;
