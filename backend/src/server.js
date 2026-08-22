import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateJWT } from './middleware/auth.js';

import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_token_key_krivexa_2026_change_in_prod';

// Security Headers & CORS
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use(express.json());

// In-Memory Data Store (Provides 100% working API endpoints even when offline or deployed without PostgreSQL)
let memoryStore = {
  inquiries: [],
  applications: [],
  newsletter: [],
  settings: { companyName: 'Krivexa Technologies', tagline: 'Innovate. Build. Transform.' }
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@krivexa.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPass) {
    const user = { id: 1, name: 'Krivexa Administrator', email: adminEmail, role: 'SUPER_ADMIN' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, data: { token, user } });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials. Use admin@krivexa.com / admin123' });
});

app.get('/api/auth/me', authenticateJWT, (req, res) => {
  res.json({ success: true, data: req.user });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

app.use('/api/admin', dashboardRoutes);

// --- INQUIRIES ROUTE ---
app.post('/api/inquiries', (req, res) => {
  const { fullName, email, message } = req.body;
  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Full name, email, and message are required' });
  }
  const inquiry = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  memoryStore.inquiries.push(inquiry);
  res.status(201).json({ success: true, message: 'Inquiry submitted successfully! Our team will contact you shortly.', data: inquiry });
});

app.get('/api/inquiries', authenticateJWT, (req, res) => {
  res.json({ success: true, data: memoryStore.inquiries });
});

// --- APPLICATIONS ROUTE ---
app.post('/api/applications', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  const appItem = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  memoryStore.applications.push(appItem);
  res.status(201).json({ success: true, message: 'Application submitted successfully!', data: appItem });
});

app.get('/api/applications', authenticateJWT, (req, res) => {
  res.json({ success: true, data: memoryStore.applications });
});

// --- NEWSLETTER ROUTE ---
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  memoryStore.newsletter.push({ email, subscribedAt: new Date().toISOString() });
  res.json({ success: true, message: 'Subscribed to newsletter' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'Krivexa Technologies', timestamp: new Date() });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Krivexa Technologies API running on port ${PORT}`);
});
