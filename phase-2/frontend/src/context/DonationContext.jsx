import { createContext, useContext, useEffect, useState } from "react";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);

  const getAllDonations = async () => {
    try {
      let res = await fetch("http://localhost:3000/donations");
      let data = await res.json();
      setDonations(data);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  useEffect(() => {
    getAllDonations();
  }, []);

  const createDonation = async (donationData) => {
    try {
      const res = await fetch("http://localhost:3000/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (!res.ok) throw new Error("Donation failed");

      alert("Thank you for your donation ❤️");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <DonationContext.Provider
      value={{ amount, setAmount, createDonation, donations }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);
