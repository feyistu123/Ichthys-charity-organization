const Event = require('../models/Event'); // Assuming you have an Event model

// Fetch events by their status (Upcoming or Past)
exports.getEventsByStatus = async (isPast) => {
    return await Event.find({ isPast: isPast }).sort({ date: isPast ? -1 : 1 });
};

// Create a new event
exports.createEvent = async (eventData) => {
    const newEvent = new Event(eventData);
    return await newEvent.save();
};

// Move an event to the "Past" category
exports.moveToPast = async (eventId) => {
    return await Event.findByIdAndUpdate(eventId, { isPast: true }, { new: true });
};
// Permanently remove an event
exports.deleteEventById = async (eventId) => {
    return await Event.findByIdAndDelete(eventId);
};