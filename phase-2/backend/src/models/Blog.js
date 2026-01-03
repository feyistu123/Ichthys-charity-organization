const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Education', 'Health', 'Emergency', 'Success Story'], 
        required: true 
    },
    content: { type: String, required: true },
    author: { type: String, required: true }, // e.g., "Sarah Johnson"
    readTime: { type: String }, // e.g., "5 min read"
    imageUrl: { type: String },
    publishedDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);