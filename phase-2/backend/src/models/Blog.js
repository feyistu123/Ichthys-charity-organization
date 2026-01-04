const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
        type: String,
        required: true 
    },
    content: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String },
    publishedDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);