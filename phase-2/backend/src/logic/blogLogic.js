const Blog = require('../models/Blog');

exports.getAllBlogs = async () => {
    return await Blog.find().sort({ createdAt: -1 });
};

exports.createBlogPost = async (data) => {
    const newBlog = new Blog(data);
    return await newBlog.save();
};

exports.updateBlogData = async (id, updateData) => {
    return await Blog.findByIdAndUpdate(
        id, 
        { $set: updateData },
        { new: true, runValidators: true }
    );
};

exports.deleteBlogById = async (id) => {
    return await Blog.findByIdAndDelete(id);
};