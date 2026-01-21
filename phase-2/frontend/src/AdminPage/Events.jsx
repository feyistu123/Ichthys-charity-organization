import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import Modal from "./Modal";
import CreateEvent from "../components/CreateEvent";
import EditEvent from "../components/EditEvent";

const Events = () => {
  const { events, deleteEvent } = useData();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (eventId) => {
    setDropdownOpen(dropdownOpen === eventId ? null : eventId);
  };

  const toggleDescription = (eventId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const truncateText = (text, limit = 100) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>Event Management</h2>
        <button className="new-event" onClick={() => setIsCreateOpen(true)}>
          <i className="bi bi-plus-circle"></i> Create New Event
        </button>
      </div>
      
      <div className="events-list">
        {events.length === 0 ? (
          <h3>No upcoming events</h3>
        ) : (
          events.map((event) => (
          <div key={event._id} className="event-card">
            <div className="event-header">
              <h3 className="event-title">{event.title}</h3>
              <span className="event-badge">{event.category}</span>
            </div>

            <div className="event-description">
              {expandedDescriptions[event._id] ? (
                <p>{event.description}</p>
              ) : (
                <p>{truncateText(event.description)}</p>
              )}
              {event.description.length > 100 && (
                <span 
                  className="read-more-link"
                  onClick={() => toggleDescription(event._id)}
                >
                  {expandedDescriptions[event._id] ? 'Show less' : 'Read more'}
                </span>
              )}
            </div>

            <div className="event-meta">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
              <span>
                👥 {event.spotsTaken}/{event.totalSpots} spots
              </span>
            </div>

            <div className="event-actions">
              <div className="dropdown-container">
                <button
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown(event._id)}
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
                {dropdownOpen === event._id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item edit-item"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEditOpen(true);
                        setDropdownOpen(null);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      className="dropdown-item delete-item"
                      onClick={() => {
                        deleteEvent(event._id);
                        setDropdownOpen(null);
                      }}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
      
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
