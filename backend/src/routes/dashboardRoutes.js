import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/dashboard (JWT Protected)
router.get('/dashboard', authenticateJWT, getDashboardData);

export default router;
