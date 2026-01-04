import React from "react";
import { useUserData } from "../context/UserContext";

const VolunteerCard = ({ Volunteer }) => {
  return (
    <div className="volunteer-card">
      <div className="volunteer-info">
        <div className="volunteer-details">
          <h4 className="volunteer-name">{Volunteer.fulName}</h4>
          <p className="volunteer-status">{Volunteer.status}</p>
        </div>
        <div className="volunteer-contact">
          <p className="volunteer-email">{Volunteer.email}</p>
        </div>
      </div>
      <div className="volunteer-actions">
        <button className="approve-btn">Approve</button>
        <button className="reject-btn">Reject</button>
      </div>
    </div>
  );
};

const Volunteer = () => {
  const { volunteers } = useUserData();
  return (
    <div className="volunteer-container">
      <h3 className="volunteer-title">Volunteer Management</h3>
      <p className="volunteer-subtitle">
        Review and manage volunteer applications
      </p>
      {!volunteers || volunteers.length === 0 ? (
        <h3 className="no-volunteers">No Volunteers</h3>
      ) : (
        <div className="volunteer-list">
          {volunteers.map((V) => (
            <VolunteerCard key={V.id} Volunteer={V} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Volunteer;
