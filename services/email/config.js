const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_PROFILE,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
