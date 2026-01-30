import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../axios/api";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);

  const getAllDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // Skip if not logged in

      const res = await api.get("/donations");
      setDonations(res.data);
    } catch (err) {
      if (err.response?.status !== 403) {
        console.error("Error fetching donations:", err);
      }
    }
  };

  useEffect(() => {
    getAllDonations();
  }, []);

  const createDonation = async (donationData) => {
    try {
      await api.post("/donations", donationData);
      alert("Thank you for your donation ❤️");
      getAllDonations();
    } catch (error) {
      console.error("Donation error:", error);
      alert("Donation failed. Please try again.");
    }
  };

  const confirmDonation = async (donationId) => {
    try {
      await api.patch(`/admin/donations/confirm/${donationId}`);
      getAllDonations();
      alert("Donation confirmed and recorded.");
    } catch (err) {
      console.error("Confirm donation error:", err);
      alert("Failed to confirm donation.");
    }
  };

  return (
    <DonationContext.Provider
      value={{ amount, setAmount, createDonation, donations, confirmDonation }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);
