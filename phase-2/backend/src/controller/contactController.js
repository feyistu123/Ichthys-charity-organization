// src/controller/contactController.js
const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
    try {
        const data = req.body;
        
        const newContact = new Contact({
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            message: data.message 
        });

        await newContact.save();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Feedback sent successfully!" }));

    } catch (err) {
        console.error("CONTACT_SUBMIT_ERROR:", err.message);
        
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to send feedback" }));
    }
};

exports.handleGetFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Contact.find().sort({ submittedAt: -1 });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(feedbacks));

    } catch (err) {
        console.error("GET_FEEDBACKS_ERROR:", err.message);
        
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Server error fetching feedbacks" }));
    }
};