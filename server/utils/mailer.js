const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendConfirmationEmail = async (userEmail, details) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Your Appointment is Booked',
    html: `
      <h3>Appointment Details</h3>
      <p>Date: ${details.date}</p>
      <p>Time: ${details.startTime} - ${details.endTime}</p>
      <p>Consultation Method: ${details.method}</p>
      <p>Thank you for booking with us.</p>
    `
  };
  await transporter.sendMail(mailOptions);
};
