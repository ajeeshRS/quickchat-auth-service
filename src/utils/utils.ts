import crypto from "crypto"
import nodemailer from "nodemailer"
export const generateOtp = () => {
    const otpLength = 5;
    const otp = crypto.randomBytes(otpLength).readUintBE(0, otpLength) % 100000;
    return otp.toString().padStart(otpLength, "0");
};

export const sendEmail = (email: string, otp: string) => {
    try {
        // Create a transporter using SMTP transport
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "me.ajeesh7979@gmail.com",
                pass: process.env.APP_SECRET,
            },
            secure: false,
        });

        // Email data
        const mailOptions: object = {
            from: "me.ajeesh7979@gmail.com",
            to: email,
            subject: "This is your one-time-password",
            text: otp,
            html: `
          <h1>OTP for Verification</h1>
          <p>Your OTP (One Time Password) for verification is: <strong>${otp}</strong>.</p>
          <p>Please use this OTP to complete the verification process.</p>
          <p>Valid for only 5 minutes.</p>
          <p style="font-style: italic;">This is an automatically generated email. Please do not reply.</p>
      `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
