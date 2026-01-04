import React, { useState } from "react";
import "./Contact.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useUserData } from "../context/UserContext";
const ContactUsPage = () => {
  const initials = {
    fullName: "",
    email: "",
    phoneNumber: "",
    comment: "",
  };
  const [feedback, setFeedback] = useState([initials]);
  const { sendFeedBack } = useUserData();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendFeedBack(feedback);
      alert("feedback submitted successfully!");
      setFeedback(initials);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div id="contact">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            id="nameInput"
            name="fullName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="exampel@gmail.com"
            id="emailInput"
            name="email"
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Phone number"
            id="phone-input"
            name="phoneNumber"
            onChange={handleChange}
          />
          <textarea
            type="text"
            name="comment"
            placeholder="Give us Comment or Feed Back "
            onChange={handleChange}
          ></textarea>
          <button id="sendBut" type="submit">
            Send Feed Back
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
