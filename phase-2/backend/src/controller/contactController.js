// src/controller/contactController.js
const Contact = require('../models/Contact');

exports.submitContactForm = (req, res) => {
    let body = '';
    
    req.on('data', chunk => { 
        body += chunk.toString(); 
    });

    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            
            const newContact = new Contact({
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                message: data.message 
            });

            await newContact.save();

            // SUCCESS RESPONSE
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Feedback sent successfully!" })); // Added return

        } catch (err) {
            console.error("CONTACT_SUBMIT_ERROR:", err.message);
            
            // ERROR RESPONSE - Only sends if headers haven't been sent yet
            if (!res.headersSent) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: "Failed to send feedback" }));
            }
        }
    });
};

exports.handleGetFeedbacks = async (req, res) => {
    try {
        // Fetch all contacts, sorted by newest first
        const feedbacks = await Contact.find().sort({ submittedAt: -1 });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(feedbacks));

    } catch (err) {
        console.error("GET_FEEDBACKS_ERROR:", err.message);
        
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Server error fetching feedbacks" }));
    }
};