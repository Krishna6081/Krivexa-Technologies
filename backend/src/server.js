import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateJWT } from './middleware/auth.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

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

// In-Memory Data Store Fallback
let memoryStore = {
  inquiries: [],
  applications: [],
  newsletter: [],
  settings: { companyName: 'Krivexa Technologies', tagline: 'Innovate. Build. Transform.' }
};

// Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', dashboardRoutes);

// --- INQUIRIES ROUTE ---
app.post('/api/inquiries', async (req, res) => {
  const { fullName, email, phone, company, service, budget, message } = req.body;
  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Full name, email, and message are required' });
  }

  // Extract optional user_id from Bearer JWT token if user is logged in
  let userId = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded && decoded.id) {
        userId = decoded.id;
      }
    } catch (e) {
      // Guest inquiry fallback
    }
  }

  const inquiry = {
    id: Date.now(),
    user_id: userId,
    full_name: fullName,
    email,
    phone: phone || null,
    company: company || null,
    service: service || null,
    budget: budget || null,
    message,
    created_at: new Date().toISOString()
  };

  // Save to PostgreSQL Database
  try {
    const insertRes = await pool.query(
      `INSERT INTO inquiries (user_id, full_name, email, phone, company, service, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, fullName, email, phone || null, company || null, service || null, budget || null, message]
    );
    if (insertRes.rows[0]) {
      return res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully! Our engineering team will contact you shortly.',
        data: insertRes.rows[0]
      });
    }
  } catch (dbErr) {
    console.warn('PostgreSQL inquiry insert fallback:', dbErr.message);
  }

  memoryStore.inquiries.push(inquiry);
  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully! Our team will contact you shortly.',
    data: inquiry
  });
});

app.get('/api/inquiries', authenticateJWT, async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    return res.json({ success: true, data: dbRes.rows });
  } catch (e) {
    res.json({ success: true, data: memoryStore.inquiries });
  }
});

// --- APPLICATIONS ROUTE ---
app.post('/api/applications', async (req, res) => {
  const { name, email, phone, linkedin, coverMessage } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  try {
    const insertRes = await pool.query(
      `INSERT INTO applications (name, email, phone, linkedin, cover_message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone || '', linkedin || '', coverMessage || '']
    );
    if (insertRes.rows[0]) {
      return res.status(201).json({ success: true, message: 'Application submitted successfully!', data: insertRes.rows[0] });
    }
  } catch (dbErr) {
    console.warn('PostgreSQL application insert fallback:', dbErr.message);
  }

  const appItem = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  memoryStore.applications.push(appItem);
  res.status(201).json({ success: true, message: 'Application submitted successfully!', data: appItem });
});

app.get('/api/applications', authenticateJWT, async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    return res.json({ success: true, data: dbRes.rows });
  } catch (e) {
    res.json({ success: true, data: memoryStore.applications });
  }
});

// --- NEWSLETTER ROUTE ---
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    await pool.query('INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT DO NOTHING', [email]);
  } catch (e) {
    memoryStore.newsletter.push({ email, subscribedAt: new Date().toISOString() });
  }

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
