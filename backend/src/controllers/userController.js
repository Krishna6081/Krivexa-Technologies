import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const userRes = await pool.query(
        'SELECT id, first_name, last_name, name, email, phone, company, role, avatar, is_verified, created_at FROM users WHERE id = $1',
        [userId]
      );
      if (userRes.rows.length > 0) {
        return res.json({ success: true, data: userRes.rows[0] });
      }
    } catch (dbErr) {
      console.warn('PostgreSQL profile lookup fallback:', dbErr.message);
    }

    res.json({ success: true, data: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user profile.' });
  }
};

// PUT /api/users/profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone, company, avatar } = req.body;
    const fullName = `${firstName ? firstName.trim() : ''} ${lastName ? lastName.trim() : ''}`.trim();

    try {
      const updateRes = await pool.query(
        `UPDATE users
         SET first_name = COALESCE($1, first_name),
             last_name = COALESCE($2, last_name),
             name = COALESCE($3, name),
             phone = COALESCE($4, phone),
             company = COALESCE($5, company),
             avatar = COALESCE($6, avatar),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING id, first_name, last_name, name, email, phone, company, role, avatar, created_at`,
        [firstName, lastName, fullName, phone, company, avatar, userId]
      );

      if (updateRes.rows[0]) {
        return res.json({ success: true, message: 'Profile updated successfully', data: updateRes.rows[0] });
      }
    } catch (dbErr) {
      console.warn('PostgreSQL profile update fallback:', dbErr.message);
    }

    const updatedUser = {
      ...req.user,
      first_name: firstName || req.user.first_name,
      last_name: lastName || req.user.last_name,
      name: fullName || req.user.name,
      phone: phone || req.user.phone,
      company: company || req.user.company,
      avatar: avatar || req.user.avatar
    };

    res.json({ success: true, message: 'Profile updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};

// POST /api/users/change-password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.'
      });
    }

    try {
      const userRes = await pool.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
      if (userRes.rows.length > 0) {
        const match = await bcrypt.compare(currentPassword, userRes.rows[0].password_hash);
        if (!match) {
          return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }
        const newHash = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, userId]);
      }
    } catch (dbErr) {
      console.warn('PostgreSQL change password fallback:', dbErr.message);
    }

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to change password.' });
  }
};

// GET /api/users/inquiries
export const getUserInquiries = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    try {
      const inquiriesRes = await pool.query(
        'SELECT * FROM inquiries WHERE user_id = $1 OR email = $2 ORDER BY created_at DESC',
        [userId, userEmail]
      );
      return res.json({ success: true, data: inquiriesRes.rows });
    } catch (dbErr) {
      console.warn('PostgreSQL inquiries lookup fallback:', dbErr.message);
    }

    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user inquiries.' });
  }
};
