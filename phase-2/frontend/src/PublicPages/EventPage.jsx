import React from "react";
import { images } from "../assets/Images/images";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const EventCard = () => {
  return (
    <div className="event-card">
      <img
        className="event-image"
        src={images.children}
        alt="Annual Charity Gala"
      />
      <p>Fundraising</p>
      <h4 className="event-title">Annual Charity Gala</h4>
      <p className="event-date">
        <i class="bi bi-calendar-event"></i>
        <span> 2/15/2025</span>
      </p>
      <p className="event-status completed">
        {" "}
        <i class="bi bi-calendar-check"></i>
        <span>Event Completed</span>
      </p>
    </div>
  );
};

export const Events = () => {
  let upComingEvents = [];

  return (
    <section className="events-section">
      <div className="upcoming-events">
        <h3 className="events-heading">Upcoming Events</h3>

        {upComingEvents.length === 0 ? (
          <div className="no-events">
            <p>No upcoming events at the moment. Check back soon.</p>
          </div>
        ) : (
          <div className="events-grid">
            <EventCard />
          </div>
        )}
      </div>

      <div className="past-events">
        <h3 className="events-heading">Past Events</h3>
        <div className="events-grid">
          <EventCard />
          <EventCard />
          <EventCard />
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
          something happening at HopeTogether.
        </p>
      </header>

      <Events />
      <Footer />
    </div>
  );
};

export default EventPage;
