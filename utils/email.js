const nodemailer = require('nodemailer');

const sendPasswordResetEmail = (email, token) => {
  const transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3001/reset-password/${token}`
  };

  try {
    transport.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendPasswordResetEmail;
