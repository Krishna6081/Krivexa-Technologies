import express from 'express';
import { getUserProfile, updateUserProfile, changePassword, getUserInquiries } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateJWT); // All user profile routes require valid user JWT

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/change-password', changePassword);
router.get('/inquiries', getUserInquiries);

export default router;
