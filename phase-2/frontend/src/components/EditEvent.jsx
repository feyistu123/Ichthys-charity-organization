import React, { useState } from "react";
import { useData } from "../context/DataContext";

const EditEvent = ({ eventData, onClose }) => {
  const [event, setEvent] = useState(initials);
  const { editEvent } = useData();

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "TotalSpot") {
      value = Number(value);
    }
    setEvent({ ...event, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editEvent({ id: eventData.id, upDatedData: projectData });

    onClose?.();
  };

  return (
    <div className="create-event-container">
      <h2 className="form-title">Edit Event</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          className="event-input"
          placeholder="Event Title"
          type="text"
          name="eventTitle"
          onChange={handleChange}
          value={event.eventTitle}
          required
        />

        <textarea
          className="event-input textarea"
          placeholder="Event Description"
          name="eventDescription"
          onChange={handleChange}
          value={event.eventDescription}
          required
        />

        <input
          className="event-input"
          placeholder="Event Category"
          type="text"
          name="eventCategory"
          list="event-list"
          onChange={handleChange}
          value={event.eventCategory}
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
            name="TotalSpot"
            onChange={handleChange}
            value={event.TotalSpot}
            required
          />

          <div className="status-field">
            <label>Status</label>
            <select
              className="event-input"
              name="status"
              onChange={handleChange}
              value={event.status}
            >
              <option value="upcoming">Upcoming Event</option>
              <option value="completed">Past Event</option>
            </select>
          </div>
        </div>

        <button type="submit" className="event-submit-btn">
          Edit Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
