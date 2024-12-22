const nodemailer = require('nodemailer');

const getTransporter = () => nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailService = {
  sendResetEmail: async (email, resetToken) => {
    try {
      if (!process.env.FRONTEND_URL) throw new Error('FRONTEND_URL is not defined');

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      const transporter = getTransporter();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Use the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nYour App Team`,
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetLink}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>Your App Team</p>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Reset email sent successfully to:', email);

    } catch (error) {
      console.error('Email sending error:', { email, resetToken, message: error.message, stack: error.stack });
      throw new Error('Failed to send reset email');
    }
  },

  sendWelcomeEmail: async (email) => {
    setImmediate(async () => {
      try {
        const transporter = getTransporter();

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Welcome to Our App!',
          text: `Thank you for registering with our app. We're excited to have you on board!\n\nBest regards,\nYour App Team`,
          html: `
            <h1>Welcome!</h1>
            <p>Thank you for registering with our app.</p>
            <p>We're excited to have you on board!</p>
            <p>Best regards,<br>Your App Team</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully to:', email);

      } catch (error) {
        console.error('Welcome email sending error:', { email, message: error.message, stack: error.stack });
      }
    });
  }
};

module.exports = emailService;
