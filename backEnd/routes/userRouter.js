import express from 'express';
import { updateAudio, uploadAudio} from '../controllers/audioController.js';
import { updateUser, verifyToken } from '../controllers/authController.js';
import { deleteType } from '../controllers/deleteType.js';

const router = express.Router();

router.post('/upload', uploadAudio);

router.get('/verify-token', verifyToken);
router.delete("/delete/:type/:id", deleteType);

router.put("/update/user/:id", updateUser);
router.put("/update/audio/:id", updateAudio);

export default router;
