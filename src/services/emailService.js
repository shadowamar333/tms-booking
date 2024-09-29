const nodemailer = require("nodemailer");

// Email sending function
async function sendConfirmationEmail(email, uniqueCode, tickets) {
   let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.GMAIL_USER,
         pass: process.env.GMAIL_PASS,
      },
   });

   const mailOptions = {
      from: '"Ticket Booking" <your-email@gmail.com>',
      to: email,
      subject: "Booking Confirmation",
      text:' Your booking is confirmed. Your unique ticket code is: ${uniqueCode}. You have booked ${tickets} tickets.',
   };

   await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };