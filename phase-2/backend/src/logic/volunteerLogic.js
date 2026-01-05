const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Logic to process a volunteer application
exports.registerVolunteerApplication = async (data) => {
    const newVolunteer = new Volunteer({
        ...data,
        status: "pending",
        joinedDate: new Date()
    });
    return await newVolunteer.save();
};

// 1. Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        // This allows the email to send even if the SSL certificate cannot be verified
        rejectUnauthorized: false
    }
});

exports.approveAndCreateAccount = async (volunteerId) => {
    // Check if volunteer exists
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) throw new Error("Volunteer not found");

    // Prevent double approval
    if (volunteer.status === 'approved') {
        throw new Error("This volunteer has already been approved.");
    }

    // 2. Generate Credentials
    const temporaryPassword = "Vol" + Math.floor(1000 + Math.random() * 9999);
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // 3. Create User Account for Login
    const newUser = new User({
        email: volunteer.email,
        password: hashedPassword,
        fullName: volunteer.fullName, 
        userType: "Volunteer",        
        role: "user"             
    });
    await newUser.save(); 

    // 4. Update Volunteer Application Status
    volunteer.status = "approved";
    await volunteer.save();

    // 5. Send Notification Email
    const mailOptions = {
        from: `"Ichthys Charity" <${process.env.EMAIL_USER}>`,
        to: volunteer.email,
        subject: "Welcome! Your Volunteer Account is Approved",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #2c3e50;">Welcome to the Team, ${volunteer.fullName}!</h2>
                <p>We are thrilled to inform you that your volunteer application has been <strong>approved</strong>.</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Login Email:</strong> ${volunteer.email}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Temporary Password:</strong> <span style="color: #e74c3c; font-weight: bold;">${temporaryPassword}</span></p>
                </div>
                <p>Please log in to the portal to view your assignments:</p>
                <a href="http://localhost:3000/login" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;">Login Now</a>
                <p style="font-size: 12px; color: #7f8c8d; margin-top: 20px;">For security, please change your password immediately after logging in.</p>
            </div>
        `
    };

    // Send email (don't await so the admin gets a fast response)
    transporter.sendMail(mailOptions).catch(err => console.error("Email Error:", err));

    return { email: volunteer.email, temporaryPassword };
};

// Get the volunteers waiting to be checked
exports.getPendingApplications = async () => {
    return await Volunteer.find({ status: 'pending' });
};

// Logic for the Dashboard (only shows approved ones)
exports.getDashboardVolunteers = async () => {
    return await Volunteer.find({ status: 'approved' });
};
