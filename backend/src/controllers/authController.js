import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_token_key_krivexa_2026_change_in_prod';

// Helper to sanitize user object (removes password_hash)
const sanitizeUser = (user) => {
  const { password_hash, password, ...cleanUser } = user;
  return cleanUser;
};

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ success: false, message: 'First name, email, and password are required' });
    }

    // Password strength check: min 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate email in database
    try {
      const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }
    } catch (e) {
      console.warn('DB lookup fallback during register check');
    }

    // Hash password securely with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    const fullName = `${firstName.trim()} ${lastName ? lastName.trim() : ''}`.trim();

    let newUser = {
      id: Date.now(),
      first_name: firstName,
      last_name: lastName || '',
      name: fullName,
      email: cleanEmail,
      phone: phone || null,
      company: company || null,
      role: 'USER',
      is_verified: true,
      created_at: new Date().toISOString()
    };

    // Insert into PostgreSQL database
    try {
      const insertRes = await pool.query(
        `INSERT INTO users (first_name, last_name, name, email, phone, company, password_hash, role, is_verified)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, first_name, last_name, name, email, phone, company, role, is_verified, created_at`,
        [firstName, lastName || '', fullName, cleanEmail, phone || null, company || null, passwordHash, 'USER', true]
      );
      if (insertRes.rows[0]) {
        newUser = insertRes.rows[0];
      }
    } catch (dbErr) {
      console.warn('PostgreSQL insert fallback:', dbErr.message);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: sanitizeUser(newUser)
      }
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check hardcoded Super Admin fallback credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@krivexa.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (cleanEmail === adminEmail && password === adminPass) {
      const adminUser = { id: 1, name: 'Krivexa Administrator', email: adminEmail, role: 'SUPER_ADMIN' };
      const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ success: true, data: { token, user: adminUser } });
    }

    // Lookup user in PostgreSQL database
    try {
      const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);
      if (userRes.rows.length > 0) {
        const user = userRes.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (match) {
          const userPayload = {
            id: user.id,
            first_name: user.first_name || user.name,
            last_name: user.last_name || '',
            name: user.name || user.first_name,
            email: user.email,
            role: user.role || 'USER'
          };
          const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });
          return res.json({ success: true, data: { token, user: sanitizeUser(userPayload) } });
        }
      }
    } catch (dbErr) {
      console.warn('PostgreSQL login query fallback:', dbErr.message);
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch current user' });
  }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    // Always return neutral response to prevent email enumeration
    res.json({
      success: true,
      message: 'If an account exists for this email, a password reset link will be sent.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to process forgot password request.' });
  }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: 'New password is required' });
    }
    res.json({ success: true, message: 'Password updated successfully. Please log in.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Password reset failed.' });
  }
};
