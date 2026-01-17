import React, { useState, useEffect } from "react";
import { useUserData } from "../context/UserContext";
import { useData } from "../context/DataContext";
import Modal from "./Modal";

const AnnouncementForm = ({ onClose }) => {
  const [announcement, setAnnouncement] = useState("");
  const { sendAnnouncement } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcement.trim()) return;

    await sendAnnouncement(announcement);
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
          required
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
  const { sendMessage } = useUserData();

  const handleSend = async () => {
    if (!message.trim()) return;

    await sendMessage(volunteer._id, message);
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
  const { assignProject } = useUserData();

  const handleAssign = async () => {
    if (!selectedProject) return;
    await assignProject(volunteer._id, selectedProject);
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
              <option key={p._id} value={p.title}>
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

const ReportCard = ({ report }) => {
  return (
    <div
      className="report-card"
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h4 style={{ margin: 0, color: "#2c3e50" }}>{report.volunteerName}</h4>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {new Date(report.submittedAt).toLocaleDateString()}
        </span>
      </div>
      <p style={{ margin: "10px 0", lineHeight: "1.5", color: "#333" }}>
        {report.report}
      </p>
      <div style={{ fontSize: "12px", color: "#888" }}>
        Status: {report.status}
      </div>
    </div>
  );
};

const VolunteerReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllReports } = useUserData();

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getAllReports();
      setReports(data);
      setLoading(false);
    };
    fetchReports();
  }, [getAllReports]);

  if (loading) return <div>Loading reports...</div>;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Volunteer Reports</h3>
      <p>Reports submitted by volunteers</p>
      {reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        reports.map((report) => <ReportCard key={report._id} report={report} />)
      )}
    </div>
  );
};

const EditAnnouncementForm = ({ item, onClose, onSave }) => {
  const [message, setMessage] = useState(item.message);
  const [projectTitle, setProjectTitle] = useState(item.projectTitle || "");
  const { editAnnouncementAssignment } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editAnnouncementAssignment(item._id, message, projectTitle);
    onSave();
    onClose();
  };

  return (
    <div className="edit-form">
      <h4>Edit {item.type === "announcement" ? "Announcement" : "Assignment"}</h4>
      
      <form onSubmit={handleSubmit}>
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        
        {item.type === "task" && (
          <>
            <label>Project Title</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </>
        )}
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const AnnouncementAssignmentCard = ({ item, onEdit, onDelete }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      margin: '10px 0', 
      borderRadius: '8px',
      backgroundColor: item.type === 'announcement' ? '#f8f9fa' : '#fff3cd'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <span style={{ 
            backgroundColor: item.type === 'announcement' ? '#007bff' : '#28a745',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            marginRight: '10px'
          }}>
            {item.type === 'announcement' ? 'Announcement' : 'Assignment'}
          </span>
          {item.volunteerName ? (
            <span style={{ fontWeight: 'bold', color: '#333' }}>To: {item.volunteerName}</span>
          ) : (
            <span style={{ fontStyle: 'italic', color: '#666' }}>To: All Volunteers</span>
          )}
        </div>
        <span style={{ fontSize: '12px', color: '#666' }}>
          {formatDate(item.createdAt)}
        </span>
      </div>
      
      <p style={{ margin: '10px 0', lineHeight: '1.5' }}>{item.message}</p>
      
      {item.projectTitle && (
        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#28a745' }}>Project: {item.projectTitle}</p>
      )}
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button 
          onClick={() => onEdit(item)}
          style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(item._id)}
          style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const AnnouncementsAssignmentsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const { getAllAnnouncementsAssignments, deleteAnnouncementAssignment } = useUserData();

  const loadItems = async () => {
    setLoading(true);
    const data = await getAllAnnouncementsAssignments();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteAnnouncementAssignment(itemId);
      loadItems();
    }
  };

  const handleSave = () => {
    loadItems();
  };

  if (loading) return <div>Loading announcements and assignments...</div>;

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Manage Announcements & Assignments</h3>
      <p>Edit or delete announcements and project assignments</p>
      
      {items.length === 0 ? (
        <p>No announcements or assignments found.</p>
      ) : (
        items.map((item) => (
          <AnnouncementAssignmentCard 
            key={item._id} 
            item={item} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
      
      {editingItem && (
        <Modal onClose={() => setEditingItem(null)}>
          <EditAnnouncementForm 
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSave}
          />
        </Modal>
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

const VolunteerCard = ({ volunteer }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const { approveVolunteer } = useUserData();

  const handleApprove = () => {
    approveVolunteer(volunteer._id);
  };

  return (
    <div className="volunteer-card">
      <h4>{volunteer.fullName}</h4>
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              volunteer.status === "approved"
                ? "green"
                : volunteer.status === "pending"
                  ? "orange"
                  : "red",
          }}
        >
          {volunteer.status}
        </span>
      </p>

      <div className="volunteer-actions">
        {volunteer.status === "pending" && (
          <button className="btn-primary" onClick={handleApprove}>
            Approve
          </button>
        )}
        <button className="btn-secondary" onClick={() => setShowInfo(true)}>
          Details
        </button>
        <button className="btn-secondary" onClick={() => setShowMessage(true)}>
          Send Message
        </button>
        {volunteer.status === "approved" && (
          <button className="btn-secondary" onClick={() => setShowAssign(true)}>
            Assign Task
          </button>
        )}
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

const Volunteer = () => {
  const { volunteers, fetchAllVolunteers } = useUserData();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Volunteer component mounted, fetching volunteers...");
    const loadVolunteers = async () => {
      setLoading(true);
      await fetchAllVolunteers();
      setLoading(false);
    };
    loadVolunteers();
  }, []);

  useEffect(() => {
    console.log("Volunteers state updated:", volunteers);
  }, [volunteers]);

  const filteredVolunteers = volunteers.filter((v) => {
    if (filter === "all") return true;
    return v.status === filter;
  });

  console.log("Filtered volunteers:", filteredVolunteers);

  if (loading) {
    return (
      <div>
        <h3>Volunteer Management</h3>
        <p>Loading volunteers...</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Volunteer Management</h3>
      <p>Review and manage volunteer applications</p>

      <div style={{ marginBottom: "20px" }}>
        <button
          className="btn-primary"
          onClick={() => setShowAnnouncement(true)}
        >
          New Announcement
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          <option value="all">All Volunteers</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {filteredVolunteers.length === 0 ? (
        <div>
          <p>No volunteers found.</p>
          <p>Total volunteers in state: {volunteers.length}</p>
          <p>Current filter: {filter}</p>
          <button
            onClick={() => {
              console.log("Refreshing volunteers...");
              fetchAllVolunteers();
            }}
            style={{ padding: "8px 16px", marginTop: "10px" }}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="volunteers-grid">
          {filteredVolunteers.map((volunteer) => (
            <VolunteerCard key={volunteer._id} volunteer={volunteer} />
          ))}
        </div>
      )}

      <VolunteerReports />

      <AnnouncementsAssignmentsManager />

      {showAnnouncement && (
        <Modal onClose={() => setShowAnnouncement(false)}>
          <AnnouncementForm onClose={() => setShowAnnouncement(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Volunteer;
