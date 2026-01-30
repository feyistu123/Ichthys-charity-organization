import React from "react";
import { images } from "../assets/Images/images";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useData } from "../context/DataContext";

const EventCard = ({ event }) => {
  const { bookEvent } = useData();

  const isFull =
    typeof event.totalSpots === "number" &&
    (event.spotsTaken || 0) >= event.totalSpots;

  return (
    <div className="event-card">
      <img
        className="event-image"
        src={event.image || images.children}
        alt={event.title}
      />
      <p>{event.category}</p>
      <h4 className="event-title">{event.title}</h4>
      <div className="event-datetime-row">
        <p className="event-date">
          <i className="bi bi-calendar-event"></i>
          <span> {event.date}</span>
        </p>
        <p className="event-time">
          <i className="bi bi-clock"></i>
          <span> {event.time}</span>
        </p>
      </div>
      <div className="event-status-row">
        <p className="event-status completed">
          <i className="bi bi-calendar-check"></i>
          <span>{event.isPast ? "Past Event" : "Upcoming Event"}</span>
        </p>
        {typeof event.totalSpots === "number" && (
          <p className="event-spots">
            👥 {event.spotsTaken || 0}/{event.totalSpots} spots
          </p>
        )}
      </div>

      {!event.isPast && (
        <button
          className={`book-seat ${isFull ? "disabled" : ""}`}
          onClick={async () => {
            if (isFull) return;
            await bookEvent(event._id);
          }}
          disabled={isFull}
        >
          {isFull ? "Full" : "Book a Seat"}
        </button>
      )}
    </div>
  );
};

export const Events = () => {
  let { events } = useData();
  let upcomingEvents = events.filter((e) => !e.isPast);
  let pastEvents = events.filter((e) => e.isPast);

  return (
    <section className="events-section">
      <div className="upcoming-events">
        <h3 className="events-heading">Upcoming Events</h3>

        {upcomingEvents.length === 0 ? (
          <div className="no-events">
            <h3>No upcoming events at the moment. Check back soon.</h3>
          </div>
        ) : (
          <div className="events-grid">
            {upcomingEvents.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        )}
      </div>

      <div className="past-events">
        <h3 className="events-heading">Past Events</h3>
        <div className="events-grid">
          {pastEvents.length === 0 ? (
            <h3>No past events at the moment.</h3>
          ) : (
            pastEvents.map((e) => <EventCard key={e._id} event={e} />)
          )}
        </div>
      </div>
    </section>
  );
};

const EventPage = () => {
  return (
    <div className="event-page">
      <NavBar />

      <header className="event-header">
        <h4>Events & Campaigns</h4>
        <p>
          Join us at our upcoming events and be part of the change. From
          fundraising galas to volunteer training sessions, there's always
          something happening at Ichthys.
        </p>
      </header>

      <Events />
      <Footer />
    </div>
  );
};

export default EventPage;
