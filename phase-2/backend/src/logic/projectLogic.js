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

exports.updateImpact = async (id, count) => {
    return await Project.findByIdAndUpdate(
        id, 
        { peopleImpacted: count }, 
        { new: true }
    );
};