import nodemailer from "nodemailer"
import envConfig from "../config/envConfig.js";
envConfig()
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS,
    },
});

const sendMail = async (email, otp) => {
    const info = await transporter.sendMail({
        from: '"Bishal Rijal" <d3vt3stin9@gmail.com>',
        to: email,
        subject: "Your OTP is here:",
        html: `Your OTP is <b>${otp}.</b> Don't share it with anyone.`, // HTML body
    });
}

export { sendMail }