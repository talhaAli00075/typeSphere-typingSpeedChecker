const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true,
    });

  
    await transporter.verify();
    console.log("SMTP transporter verified");

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email not sent:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
