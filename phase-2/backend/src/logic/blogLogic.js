const Blog = require('../models/Blog');

exports.getAllBlogs = async () => {
    return await Blog.find().sort({ createdAt: -1 }); // Newest first
};

exports.createBlogPost = async (data) => {
    const newBlog = new Blog(data);
    return await newBlog.save();
};

exports.deleteBlogById = async (id) => {
    return await Blog.findByIdAndDelete(id);
};