import React, { useState } from "react";
import { useUserData } from "../context/UserContext";
import { useData } from "../context/DataContext";
import Modal from "./Modal";

const AnnouncementForm = ({ onClose }) => {
  const [announcement, setAnnouncement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Announcement:", announcement);
    onClose();
  };

  return (
    <div className="announcement-form">
      <h4 className="announcement-title">
        Send announcement to all volunteers
      </h4>
      <p className="announcement-desc">
        This will be sent to all approved volunteers
      </p>

      <form className="announcement-form-body" onSubmit={handleSubmit}>
        <label className="announcement-label">Announcement</label>
        <textarea
          className="announcement-textarea"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        />

        <div className="announcement-actions">
          <button className="btn-primary" type="submit">
            Send
          </button>
          <button className="btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const SendMessage = ({ volunteer, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log(`Message to ${volunteer.fullName}:`, message);
    onClose();
  };

  return (
    <div className="send-message">
      <h3 className="send-message-title">
        Send Message to {volunteer.fullName}
      </h3>

      <textarea
        className="send-message-textarea"
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="send-message-actions">
        <button className="btn-primary" onClick={handleSend}>
          Send
        </button>
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const AssignProject = ({ volunteer, onClose }) => {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState("");

  const handleAssign = () => {
    console.log(`Assigned ${selectedProject} to ${volunteer.fullName}`);
    onClose();
  };

  return (
    <div className="assign-project">
      <h4 className="assign-project-title">
        Assign Project to {volunteer.fullName}
      </h4>

      {projects.length === 0 ? (
        <p className="assign-project-empty">No projects available</p>
      ) : (
        <>
          <select
            className="assign-project-select"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>

          <div className="assign-project-actions">
            <button
              className="btn-primary"
              disabled={!selectedProject}
              onClick={handleAssign}
            >
              Assign
            </button>
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const VolunteerInfo = ({ volunteer }) => {
  return (
    <div className="volunteer-info-modal">
      <h3 className="volunteer-info-title">Volunteer Details</h3>

      <div className="volunteer-info-row">
        <span>Name:</span> {volunteer.fullName}
      </div>
      <div className="volunteer-info-row">
        <span>Email:</span> {volunteer.email}
      </div>
      <div className="volunteer-info-row">
        <span>Area of Interest:</span> {volunteer.areaOfInterest}
      </div>
      <div className="volunteer-info-row">
        <span>Status:</span> {volunteer.status}
      </div>
      <div className="volunteer-info-row">
        <span>Phone:</span> {volunteer.phoneNumber}
      </div>
      <div className="volunteer-info-row">
        <span>Availability:</span> {volunteer.availability}
      </div>
    </div>
  );
};

/* ================= Volunteer Card ================= */
const VolunteerCard = ({ volunteer }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  return (
    <div className="volunteer-card">
      <h4>{volunteer.fullName}</h4>
      <p>{volunteer.status}</p>
      <p>{volunteer.email}</p>

      <div className="volunteer-actions">
        <button className="btn-primary">Approve</button>
        <button className="btn-secondary" onClick={() => setShowInfo(true)}>
          Details
        </button>
        <button className="btn-secondary" onClick={() => setShowMessage(true)}>
          Send Message
        </button>
        <button className="btn-secondary" onClick={() => setShowAssign(true)}>
          Assign Project
        </button>
        <button className="btn-danger">Reject</button>
      </div>

      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <VolunteerInfo
            onClose={() => setShowInfo(false)}
            volunteer={volunteer}
          />
        </Modal>
      )}

      {showMessage && (
        <Modal onClose={() => setShowMessage(false)}>
          <SendMessage
            volunteer={volunteer}
            onClose={() => setShowMessage(false)}
          />
        </Modal>
      )}

      {showAssign && (
        <Modal onClose={() => setShowAssign(false)}>
          <AssignProject
            volunteer={volunteer}
            onClose={() => setShowAssign(false)}
          />
        </Modal>
      )}
    </div>
  );
};

/* ================= Main ================= */
const Volunteer = () => {
  const { volunteers } = useUserData();
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  return (
    <div>
      <h3>Volunteer Management</h3>
      <p>Review and manage volunteer applications</p>

      <button className="btn-primary" onClick={() => setShowAnnouncement(true)}>
        New Announcement
      </button>

      {showAnnouncement && (
        <Modal onClose={() => setShowAnnouncement(false)}>
          <AnnouncementForm onClose={() => setShowAnnouncement(false)} />
        </Modal>
      )}

      {!volunteers || volunteers.length === 0 ? (
        <h3>No Volunteers</h3>
      ) : (
        volunteers.map((v) => <VolunteerCard key={v.id} volunteer={v} />)
      )}
    </div>
  );
};

export default Volunteer;
