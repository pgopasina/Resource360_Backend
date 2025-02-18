const nodemailer = require("nodemailer");
const cfig = require("../config"); // Assuming you have a config file for userPassword

const sendMail = async (req, res) => {
  const { from, to, cc, subject, text } = req.body;

  if (!from || !to || !subject || !text) {
    return res.status(400).json({
      message: "From, To, Subject, and Text are required fields.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    port: 465,
    secure: true,
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: from,
      pass: cfig.userPassword,
    },
    // debug: true,
    // logger: true,
  });

  try {
    const info = await transporter.sendMail({
      from: cfig.userMail,
      // to: "vmarupu@miraclesoft.com, jadvani@miraclesoft.com",
      // // cc:"daburi@miraclesoft.com",
      to,
      cc,
      subject,
      text,
    });

    res.status(200).json({
      message: "Mail sent successfully",
      info: info,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    res.status(500).json({
      message: "Error sending email",
      error: error.message,
    });
  }
};

module.exports = { sendMail };

// const nodemailer = require('nodemailer');
// const cron = require('node-cron');
// const cfig = require('../config');

// // Temporary storage for email details
// let emailDetails = {
//   from: '',
//   to: '',
//   cc: '',
//   subject: '',
//   text: ''
// };

// // API to set email details
// const setEmailDetails = (req, res) => {
//   const { from, to, cc, subject, text } = req.body;

//   if (!from || !to || !subject || !text) {
//     return res.status(400).json({
//       message: "From, To, Subject, and Text are required fields.",
//     });
//   }

//   emailDetails = { from, to, cc, subject, text };
//   console.log("Email details set:", emailDetails);
//   res.status(200).json({
//     message: "Email details set successfully",
//     emailDetails
//   });
// };

// // Function to send email
// const sendMail = async () => {
//   const { from, to, cc, subject, text } = emailDetails;

//   if (!from || !to || !subject || !text) {
//     console.error("From, To, Subject, and Text are required fields.");
//     console.log("Current email details:", emailDetails);
//     return;
//   }

//   const transporter = nodemailer.createTransport({
//     host: "smtppro.zoho.in",
//     port: 465,
//     secure: true,
//     requireTLS: true,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     auth: {
//       user: from,
//       pass: cfig.userPassword,
//     },
//     // debug: true,
//     // logger: true,
//   });

//   try {
//     const info = await transporter.sendMail({
//       from,
//       to,
//       cc,
//       subject,
//       text,
//     });

//     console.log("Email sent:", info);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// // Schedule the task to run every 5 seconds for testing
// // cron.schedule('* 2 * * *', () => {
// //   console.log('Running cron job to send email');
// //   if (emailDetails.from && emailDetails.to && emailDetails.subject && emailDetails.text) {
// //     sendMail();
// //   } else {
// //     console.log("Email details are not set. Skipping email send.");
// //   }
// // });

// module.exports = { setEmailDetails, sendMail };
