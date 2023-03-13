import express from 'express';
import {downloadAudio, updateAudio, uploadAudio} from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';
import {addMusicPlaylist, createPlaylist} from "../controllers/playlistController.js";
import {addlike, removeLike} from "../controllers/likeController.js";

const router = express.Router();

router.post('/upload', uploadAudio);
router.post('/create-playlist', createPlaylist);
router.post('/playlist/:playlistId/musics/:musicId', addMusicPlaylist);
router.post('/likes/:musicId', addlike);

router.get('/verify-token', verifyToken);
router.get('/download/:id', downloadAudio);

router.delete("/delete/:type/:id", deleteType);
router.delete("/delete/likes/:likeId", removeLike);

router.put("/update/user/:id", updateUser);
router.put("/update/audio/:id", updateAudio);

export default router;