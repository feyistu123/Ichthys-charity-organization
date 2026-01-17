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
    message: "",
  };
  const [feedback, setFeedback] = useState(initials);
  const { sendFeedBack } = useUserData();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendFeedBack(feedback);
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
            value={feedback.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            id="emailInput"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Phone number"
            id="phone-input"
            name="phoneNumber"
            value={feedback.phoneNumber}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Give us Comment or Feed Back"
            value={feedback.message}
            onChange={handleChange}
            required
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
