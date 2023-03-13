import express from 'express';
import { downloadAudio, updateAudio, uploadAudio} from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';
import { addMusicPlaylist, createPlaylist } from '../controllers/playlistController.js';

const router = express.Router();

router.post('/upload', uploadAudio);
router.post('/create-playlist', createPlaylist);
router.post('/playlist/:playlistId/musics/:musicsId', addMusicPlaylist);

router.get('/verify-token', verifyToken);
router.get('/download/:id', downloadAudio);

router.delete("/delete/:type/:id", deleteType);

router.put("/update/user/:id", updateUser);
router.put("/update/audio/:id", updateAudio);

export default router;
