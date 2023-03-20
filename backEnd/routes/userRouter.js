import express from 'express';
import { downloadAudio, updateAudio, uploadAudio} from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';
import { addMusicPlaylist, createPlaylist } from '../controllers/playlistController.js';
import {toggleLike} from "../controllers/likeController.js";
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
router.get('/home', user)

router.delete('/delete/:type/:id', deleteType);

router.put('/update/user/:id', updateUser);
router.put('/update/audio/:id', updateAudio);
router.put('/update/comment/:id', updateComment)

export default router;
