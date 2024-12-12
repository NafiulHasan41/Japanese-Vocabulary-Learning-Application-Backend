import express from 'express';
import { getMe , loginUser, registerUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';



const router = express.Router();

router.post('/register', registerUser);
router.post('/login' ,  loginUser);
router.get('/me', protect, getMe);

export default router;
