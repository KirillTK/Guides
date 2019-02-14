const emailConfig = require('../emailConfig');
const nodemailer = require('nodemailer');

const sendEmail = async (token) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
      user: emailConfig.email,
      pass: emailConfig.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Kirill Tkachov" <starpatrik06@gmail.com', // sender address
    to: "starpatrik06@gmail.com", // list of receivers
    subject: "Verify account", // Subject line
    text: "Please verify account", // plain text body
    html: `<a href='http://localhost:3000/api/verify/${token}'>Go to link</a>`
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {sendEmail};
