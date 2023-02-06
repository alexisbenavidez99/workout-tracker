const nodemailer = require('nodemailer');


const sendPasswordResetEmail = (email, token) => {
  const transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'longevityteamfit@outlook.com',
      pass: 'Newpassword',
    },
  });
  const mailOptions = {
    from: 'longevityteamfit@outlook.com',
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
