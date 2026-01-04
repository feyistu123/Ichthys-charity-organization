// src/logic/taskAnnouncementLogic.js
const TaskAnnouncement = require('../models/TaskAnnouncement');
const Volunteer = require('../models/Volunteer');

 // Logic for Volunteers: Find tasks matching their interest
exports.getFilteredTasksForVolunteer = async (email) => {
    // 1. Fetch the volunteer and check if they are approved
    const volunteer = await Volunteer.findOne({ 
        email: email, 
        status: "approved" 
    });
    
    // 2. If no volunteer is found OR they aren't approved, return null
    if (!volunteer) {
        return { error: "Access Denied: Your account is not approved yet." };
    }

    // 3. Fetch tasks matching their exact interest
    const tasks = await TaskAnnouncement.find({ 
        areaOfInterest: volunteer.areaOfInterest 
    }).sort({ createdAt: -1 });

    return { data: tasks };
};

exports.getAdminCategorizedTasks = async () => {
    const allTasks = await TaskAnnouncement.find().sort({ createdAt: -1 });
    
    // Separating by category for the Admin Dashboard view
    const categorized = {
        'Education Tutor': allTasks.filter(t => t.areaOfInterest === 'Education Tutor'),
        'Health Support': allTasks.filter(t => t.areaOfInterest === 'Health Support'),
        'Environment': allTasks.filter(t => t.areaOfInterest === 'Environment'),
        'Social Work': allTasks.filter(t => t.areaOfInterest === 'Social Work'),
        'Other': allTasks.filter(t => t.areaOfInterest === 'Other')
    };
    
    return categorized;
};

exports.createNewPost = async (postData, adminId) => {
    const newPost = new TaskAnnouncement({
        ...postData,
        postedBy: adminId
    });
    return await newPost.save();
};

exports.updatePost = async (postId, updateData) => {
    return await TaskAnnouncement.findByIdAndUpdate(postId, updateData, { 
        new: true, 
        runValidators: true 
    });
};

exports.deletePost = async (postId) => {
    return await TaskAnnouncement.findByIdAndDelete(postId);
};