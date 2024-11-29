const nodemailer = require("nodemailer");
require("dotenv").config();
const username = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;
class EmailService {
    sendCustomEmail = async(to, subject, text) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: username,
              pass: password,
            },
          });

        await transporter.sendMail({
            from: username,
            to,
            subject,
            text
        });
    }
}
module.exports = new EmailService();