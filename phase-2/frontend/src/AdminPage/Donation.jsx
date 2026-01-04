import React from "react";
import { useDonation } from "../context/DonationContext";

const DonationCard = ({ donation }) => {
  return (
    <div className="donation-card">
      <div className="donation-head">
        <i className="bi bi-currency-dollar donation-icon"></i>
        <p className="donation-amount">{donation.amount}</p>
        <p className="donation-type">{donation.donationType}</p>
      </div>
      <div className="donor-info">
        <p className="donor-details">
          {donation.fullName} · {donation.email}
        </p>
      </div>
    </div>
  );
};

const Donation = () => {
  const { donations } = useDonation();
  return (
    <div className="donations-container">
      <h3 className="donation-title">Donation Management</h3>
      <p className="donation-subtitle">Track and manage all donations</p>
      {!donations || donations.length === 0 ? (
        <h3 className="no-donations">No Donation information available</h3>
      ) : (
        <div className="donation-list">
          {donations.map((d) => (
            <DonationCard key={d.id} donation={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Donation;
