import React, { useState, useContext } from "react";
import { useData } from "../context/DataContext";

const CreateEvent = ({ onClose }) => {
  const initials = {
    eventType: "",
    eventTitle: "",
    location: "",
    startDate: "",
    status: "Upcoming event",
  };

  const [event, setEvent] = useState(initials);
  const { createEvent } = useData();

  const handleChange = (e) => {
    let value = e.target.value;
    setProject({ ...project, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(event);
    console.log("event created:", event);
    setEvent(initials);
    onClose();
  };

  return (
    <div className="create-event-container">
      <h2 className="form-title">Create New event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <input
          className="event-input"
          placeholder="Event Type"
          type="text"
          name="title"
          onChange={handleChange}
          value={event.eventType}
          required
        />

        <input
          className="event-input"
          placeholder="Title"
          type="text"
          name="eventTitle"
          onChange={handleChange}
          value={event.eventTitle}
          required
        />
        <input
          className="event-input"
          placeholder="Location"
          type="text"
          name="location"
          onChange={handleChange}
          value={event.location}
          required
        />

        <div className="date-status">
          <input
            className="event-input"
            placeholder="Start Date"
            type="date"
            name="startDate"
            onChange={handleChange}
            value={event.startDate}
            required
          />

          <br />
          <div className="status-field">
            <label htmlFor="status">Status:</label>
            <select
              className="event-input"
              name="status"
              id="status"
              onChange={handleChange}
              value={event.status}
            >
              <option value="active">Upcoming event</option>
              <option value="completed">past event</option>
            </select>
          </div>
        </div>

        <button type="submit" className="project-submit-btn">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
