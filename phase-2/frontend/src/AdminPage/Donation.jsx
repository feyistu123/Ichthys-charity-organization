import React from "react";
import { useDonation } from "../context/DonationContext";

const DonationCard = ({ donation }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="donation-card">
      <div className="donation-head">
        <i className="bi bi-currency-dollar donation-icon"></i>
        <div className="donation-amount-info">
          <p className="donation-amount">{formatAmount(donation.amount, donation.currency)}</p>
          <span className="donation-type-badge">{donation.donationType}</span>
        </div>
      </div>
      <div className="donor-info">
        <p className="donor-name">{donation.donorName}</p>
        <p className="donor-email">{donation.email}</p>
        <div className="donation-details">
          <span className="donation-date">{formatDate(donation.date)}</span>
          <span className="payment-method">{donation.paymentMethod}</span>
        </div>
        {donation.projectId ? (
          <p className="project-info">
            Project: {donation.projectId.title}
          </p>
        ) : (
          <p className="project-info general-fund">
            General Organization Fund
          </p>
        )}
      </div>
    </div>
  );
};

const Donation = () => {
  const { donations } = useDonation();
  
  const totalDonations = donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0;
  const donationCount = donations?.length || 0;
  
  return (
    <div className="donations-container">
      <div className="donation-header">
        <h3 className="donation-title">Donation Management</h3>
        <p className="donation-subtitle">Track and manage all donations</p>
        
        <div className="donation-stats">
          <div className="stat-card">
            <h4>Total Donations</h4>
            <p className="stat-value">{donationCount}</p>
          </div>
          <div className="stat-card">
            <h4>Total Amount</h4>
            <p className="stat-value">${totalDonations.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {!donations || donations.length === 0 ? (
        <div className="no-donations">
          <i className="bi bi-heart"></i>
          <h3>No Donation information available</h3>
          <p>Donations will appear here once they are submitted.</p>
        </div>
      ) : (
        <div className="donation-list">
          {donations.map((d) => (
            <DonationCard key={d._id} donation={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Donation;
