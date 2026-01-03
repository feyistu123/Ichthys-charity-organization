const Project = require('../models/Project');

exports.getAllProjects = async () => {
    return await Project.find();
};

exports.createProject = async (data) => {
    const newProject = new Project(data);
    return await newProject.save();
};

exports.toggleStatus = async (id) => {
    const project = await Project.findById(id);
    if (!project) return null;
    project.status = project.status === 'Active' ? 'Completed' : 'Active';
    return await project.save();
};

exports.modifyProject = async (id, updateData) => {
    return await Project.findByIdAndUpdate(
        id, 
        { $set: updateData }, 
        { new: true, runValidators: true }
    );
};

exports.deleteProjectById = async (id) => {
    return await Project.findByIdAndDelete(id);
};