import React from "react";
import { useState, useEffect } from "react";
import { useUserData } from "../context/UserContext";
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
      <p
        style={{
          margin: "10px 0",
          lineHeight: "1.5",
          color: "#333",
          textAlign: "left",
        }}
      >
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
export default VolunteerReports;
