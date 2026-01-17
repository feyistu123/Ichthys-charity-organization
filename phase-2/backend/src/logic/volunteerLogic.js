const Volunteer = require("../models/Volunteer");
const User = require("../models/User");
const TaskAnnouncement = require("../models/TaskAnnouncement");
const Report = require("../models/Report");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Logic to process a volunteer application
exports.registerVolunteerApplication = async (data) => {
  const newVolunteer = new Volunteer({
    ...data,
    status: "pending",
    joinedDate: new Date(),
  });
  return await newVolunteer.save();
};

// 1. Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // This allows the email to send even if the SSL certificate cannot be verified
    rejectUnauthorized: false,
  },
});

exports.approveAndCreateAccount = async (volunteerId) => {
  // Check if volunteer exists
  const volunteer = await Volunteer.findById(volunteerId);
  if (!volunteer) throw new Error("Volunteer not found");

  // Prevent double approval
  if (volunteer.status === "approved") {
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
    role: "user",
    secretCode: "volunteer", // Default secret code for approved volunteers
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
        `,
  };

  // Send email (don't await so the admin gets a fast response)
  transporter
    .sendMail(mailOptions)
    .catch((err) => console.error("Email Error:", err));

  return { email: volunteer.email, temporaryPassword };
};

// Get the volunteers waiting to be checked
exports.getPendingApplications = async () => {
  return await Volunteer.find({ status: "pending" });
};

// Logic for the Dashboard (only shows approved ones)
exports.getDashboardVolunteers = async () => {
  return await Volunteer.find({ status: "approved" });
};

// Send announcement to all approved volunteers
exports.sendAnnouncementToAll = async (message) => {
  // Save announcement to database
  const announcement = new TaskAnnouncement({
    type: "announcement",
    message: message,
  });
  await announcement.save();
  
  const approvedVolunteers = await Volunteer.find({ status: "approved" });
  
  const mailPromises = approvedVolunteers.map(volunteer => {
    const mailOptions = {
      from: `"Ichthys Charity" <${process.env.EMAIL_USER}>`,
      to: volunteer.email,
      subject: "Important Announcement from Ichthys Charity",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #2c3e50;">Announcement</h2>
          <p>Dear ${volunteer.fullName},</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p>${message}</p>
          </div>
          <p>Thank you for your continued support!</p>
          <p>Best regards,<br>Ichthys Charity Team</p>
        </div>
      `,
    };
    
    return transporter.sendMail(mailOptions);
  });
  
  await Promise.all(mailPromises);
};

// Send message to specific volunteer
exports.sendMessageToVolunteer = async (volunteerId, message) => {
  const volunteer = await Volunteer.findById(volunteerId);
  if (!volunteer) throw new Error("Volunteer not found");
  
  // Save message to database
  const taskMessage = new TaskAnnouncement({
    type: "announcement",
    message: message,
    volunteerId: volunteerId,
    volunteerName: volunteer.fullName,
  });
  await taskMessage.save();
  
  const mailOptions = {
    from: `"Ichthys Charity" <${process.env.EMAIL_USER}>`,
    to: volunteer.email,
    subject: "Personal Message from Ichthys Charity",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #2c3e50;">Personal Message</h2>
        <p>Dear ${volunteer.fullName},</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p>${message}</p>
        </div>
        <p>Best regards,<br>Ichthys Charity Team</p>
      </div>
    `,
  };
  
  await transporter.sendMail(mailOptions);
};

// Get all volunteers for admin dashboard
exports.getAllVolunteers = async () => {
  return await Volunteer.find({}).sort({ joinedDate: -1 });
};
// Assign project to volunteer
exports.assignProjectToVolunteer = async (volunteerId, projectTitle) => {
  const volunteer = await Volunteer.findById(volunteerId);
  if (!volunteer) throw new Error("Volunteer not found");
  
  // Save task assignment to database
  const taskAssignment = new TaskAnnouncement({
    type: "task",
    message: `You have been assigned to project: ${projectTitle}`,
    volunteerId: volunteerId,
    volunteerName: volunteer.fullName,
    projectTitle: projectTitle,
  });
  await taskAssignment.save();
  
  // Send email notification
  const mailOptions = {
    from: `"Ichthys Charity" <${process.env.EMAIL_USER}>`,
    to: volunteer.email,
    subject: "New Project Assignment",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #2c3e50;">New Project Assignment</h2>
        <p>Dear ${volunteer.fullName},</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Project:</strong> ${projectTitle}</p>
          <p>You have been assigned to this project. Please log in to your dashboard for more details.</p>
        </div>
        <p>Best regards,<br>Ichthys Charity Team</p>
      </div>
    `,
  };
  
  await transporter.sendMail(mailOptions);
};

// Get announcements and tasks for specific volunteer
exports.getVolunteerTasksAnnouncements = async (userId) => {
  console.log('Getting tasks for user ID:', userId);
  
  // First find the volunteer record using the user ID
  const user = await User.findById(userId);
  if (!user) {
    console.log('User not found');
    return [];
  }
  
  const volunteer = await Volunteer.findOne({ email: user.email });
  if (!volunteer) {
    console.log('Volunteer record not found for email:', user.email);
    return [];
  }
  
  console.log('Found volunteer:', volunteer._id);
  
  // Get general announcements (for all volunteers) and specific messages/tasks
  const generalAnnouncements = await TaskAnnouncement.find({ 
    type: "announcement", 
    volunteerId: null 
  }).sort({ createdAt: -1 });
  
  const personalItems = await TaskAnnouncement.find({ 
    volunteerId: volunteer._id 
  }).sort({ createdAt: -1 });
  
  console.log('General announcements:', generalAnnouncements.length);
  console.log('Personal items:', personalItems.length);
  
  return [...generalAnnouncements, ...personalItems];
};
// Submit volunteer report
exports.submitVolunteerReport = async (userId, reportText) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  
  const volunteer = await Volunteer.findOne({ email: user.email });
  if (!volunteer) throw new Error("Volunteer record not found");
  
  const report = new Report({
    volunteerId: volunteer._id,
    volunteerName: volunteer.fullName,
    report: reportText,
  });
  
  await report.save();
  return report;
};

// Get all reports for admin
exports.getAllReports = async () => {
  return await Report.find({}).sort({ submittedAt: -1 });
};

// Get all announcements and assignments for admin
exports.getAllAnnouncementsAssignments = async () => {
  return await TaskAnnouncement.find({}).sort({ createdAt: -1 });
};

// Edit announcement or assignment
exports.editAnnouncementAssignment = async (itemId, message, projectTitle) => {
  const item = await TaskAnnouncement.findById(itemId);
  if (!item) throw new Error("Item not found");
  
  item.message = message;
  if (projectTitle !== undefined) {
    item.projectTitle = projectTitle;
  }
  
  await item.save();
  return item;
};

// Delete announcement or assignment
exports.deleteAnnouncementAssignment = async (itemId) => {
  const item = await TaskAnnouncement.findById(itemId);
  if (!item) throw new Error("Item not found");
  
  await TaskAnnouncement.findByIdAndDelete(itemId);
  return { message: "Deleted successfully" };
};