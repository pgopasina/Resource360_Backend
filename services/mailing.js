const nodemailer = require("nodemailer");
const cfig = require("../config.json");

const sendMail = async (req, res) => {
  const { from, to, cc, subject, text } = req.body;

  if (!from || !to || !cc || !subject || !text) {
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
      from,
      to,
      cc,
      subject,
      text,
    });
    console.log("qqqqqqqqqqqqqqqqqqq", info);

    res.status(200).json({
      message: "mail sent successfully",
      info: info,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending email",
      error: error.message,
    });
  }
};

module.exports = { sendMail };
