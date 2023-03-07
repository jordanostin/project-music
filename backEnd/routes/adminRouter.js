import express from 'express';
import { updateAudio, uploadAudio } from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';

const router = express.Router();

router.post('/upload', uploadAudio);

router.get('/verify-token', verifyToken);
router.get("/delete/:type/:id", deleteType);

router.put("/users/:id", updateUser);
router.put("/products/:id", updateAudio);

export default router;