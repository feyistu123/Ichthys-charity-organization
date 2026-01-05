const nodemailer = require('nodemailer');

// Reuse the settings that worked for your approval notifications
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: { 
        rejectUnauthorized: false // Fixes the self-signed certificate error you encountered
    }
});

exports.sendVerificationCode = async (email, code) => {
    const mailOptions = {
        from: `"Ichthys Charity" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Verification Code",
        html: `
            <div style="font-family: sans-serif; text-align: center; border: 1px solid #f0f0f0; padding: 20px;">
                <h2>Password Reset Request</h2>
                <p>Use the 4-digit code below to verify your identity. This code is valid for 10 minutes.</p>
                <h1 style="color: #007bff; letter-spacing: 10px; font-size: 40px;">${code}</h1>
                <p>If you did not request this, please ignore this email.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};