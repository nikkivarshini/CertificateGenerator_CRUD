const nodemailer = require("nodemailer");
const fs = require("fs");

exports.sendEmail = async (email, pdfPath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,  
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Certificate from CRUD Academy",
      text: "Please find your certificate attached.",
      attachments: [{ filename: "certificate.pdf", path: pdfPath }],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to " + email);
    return { message: 'Certificate sent successfully!' };
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error('Failed to send email');
  }
};
