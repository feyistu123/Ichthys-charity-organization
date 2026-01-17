import React, { useState } from "react";
import { useData } from "../context/DataContext";

const CreateEvent = ({ onClose }) => {
  const initials = {
    title: "",
    description: "",
    location: "",
    category: "",
    date: "",
    totalSpots: 0,
    time: "",
    isPast: false,
    image: null,
  };

  const [event, setEvent] = useState(initials);
  const { createEvent } = useData();

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "totalSpots") {
      value = Number(value) || 0;
    }
    if (e.target.name === "isPast") {
      value = value === "true";
    }
    setEvent({ ...event, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setEvent({ ...event, image: file });
    } else {
      setEvent({ ...event, image: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(event);
      setEvent(initials);
      onClose?.();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="create-event-container">
      <h2 className="form-title">Create New Event</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          className="event-input"
          placeholder="Event Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={event.title || ""}
          required
        />

        <textarea
          className="event-input textarea"
          placeholder="Event Description"
          name="description"
          onChange={handleChange}
          value={event.description || ""}
          required
        />

        <input
          className="event-input"
          placeholder="Event Category"
          type="text"
          name="category"
          list="event-list"
          onChange={handleChange}
          value={event.category || ""}
          required
        />
        <datalist id="event-list">
          <option value="Fundraising" />
          <option value="Training" />
          <option value="Awareness" />
        </datalist>

        <input
          className="event-input"
          placeholder="Location"
          type="text"
          name="location"
          onChange={handleChange}
          value={event.location}
          required
        />

        <div className="event-grid">
          <input
            className="event-input"
            type="date"
            name="date"
            onChange={handleChange}
            value={event.date}
            required
          />

          <input
            className="event-input"
            type="time"
            name="time"
            onChange={handleChange}
            value={event.time}
          />

          <input
            className="event-input"
            placeholder="Total Spots"
            type="number"
            name="totalSpots"
            onChange={handleChange}
            value={event.totalSpots}
            required
          />

          <div className="status-field">
            <label>Status</label>
            <select
              className="event-input"
              name="isPast"
              onChange={handleChange}
              value={event.isPast}
            >
              <option value="false">Upcoming Event</option>
              <option value="true">Past Event</option>
            </select>
          </div>
        </div>
        
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="event-input"
        />
        <button type="submit" className="event-submit-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
