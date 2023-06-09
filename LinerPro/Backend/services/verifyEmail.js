const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdulraheemzxcv@gmail.com",
        pass: "shwkszfdgkccaioz",
      },
    });

    await transporter.sendMail({
      from: "abdulraheemzxcv@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
}