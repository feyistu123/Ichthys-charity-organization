import React, { useState } from "react";
import { useData } from "../context/DataContext";
import Modal from "./Modal";
import CreateEvent from "../components/CreateEvent";
import EditEvent from "../components/EditEvent";

const Events = () => {
  const { events, deleteEvent } = useData();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="events-container">
      {events.length === 0 ? (
        <h3>No upcoming events</h3>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h3 className="event-title">{event.eventTitle}</h3>
              <span className="event-badge">{event.eventCategory}</span>
            </div>

            <p className="event-description">{event.eventDescription}</p>

            <div className="event-meta">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
              <span>
                👥 {event.spotsTaken}/{event.totalSpots} spots
              </span>
            </div>

            <div className="project-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setSelectedEvent(event);
                  setIsEditOpen(true);
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteEvent(event.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}
      <button className="create-but" onClick={() => setIsCreateOpen(true)}>
        Create New Event
      </button>
      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)}>
          <CreateEvent onClose={() => setIsCreateOpen(false)} />
        </Modal>
      )}

      {isEditOpen && selectedEvent && (
        <Modal onClose={() => setIsEditOpen(false)}>
          <EditEvent
            eventData={selectedEvent}
            onClose={() => setIsEditOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Events;
