import express from 'express';
import { updateAudio, uploadAudio } from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';
import multer from 'multer'

const uploadAudioMiddleware = multer({dest : 'upload/audio'});
const uploadImageMiddleware = multer({dest : 'upload/image'});
const router = express.Router();

router.post('/upload', uploadAudioMiddleware.single('audio'), uploadAudio);

router.get('/verify-token', verifyToken);
router.get("/delete/:type/:id", deleteType);

router.put("/users/:id", updateUser);
router.put("/products/:id", updateAudio);

export default router;
