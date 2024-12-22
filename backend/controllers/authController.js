const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../services/emailService');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Registration failed: Email exists -', email);
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Validate password
      if (!password || password.length < 6) {
        console.log('Registration failed: Invalid password format');
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      // Create new user
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      // Generate token
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('User registered successfully:', email);
      res.status(201).json({ token });

    } catch (error) {
      console.error('Registration error:', {
        message: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        console.log('Login failed: User not found -', email);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Login failed: Invalid password -', email);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('User logged in successfully:', email);
      res.json({ token });

    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Login failed' });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log('Password reset failed: Email not found -', email);
        return res.status(404).json({ error: 'Email not found' });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour
  
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
  
      console.log('Password reset token generated for:', email);
  
      // Return the reset token
      res.json({ resetToken });
  
    } catch (error) {
      console.error('Forgot password error:', {
        message: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Failed to generate reset token' });
    }
  },
  

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
      });

      if (!user) {
        console.log('Password reset failed: Invalid or expired token');
        return res.status(400).json({ error: 'Invalid or expired reset link' });
      }

      // Validate new password
      if (!newPassword || newPassword.length < 6) {
        console.log('Password reset failed: Invalid password format');
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      // Update password
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();

      console.log('Password reset successful for user:', user.email);
      res.json({ message: 'Password reset successful' });

    } catch (error) {
      console.error('Reset password error:', {
        message: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Password reset failed' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get profile error:', {
        message: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Failed to get profile' });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      if (!users) {
        return res.status(404).json({ error: 'there r no users' });
      }
      res.json(users);
    } catch (error) {
      console.error('Get users error:', {
        message: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Failed to get profile' });
    }
  }
};

module.exports = authController;