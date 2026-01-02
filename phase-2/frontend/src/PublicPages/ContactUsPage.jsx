import React from "react";
import "./Contact.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { images } from "../assets/Images/images";
const ContactUsPage = () => {
  return (
    <div>
      <NavBar />
      <div id="contact">
        <form>
          <input type="text" placeholder="Full Name" id="nameInput" />
          <input type="email" placeholder="exampel@gmail.com" id="emailInput" />
          <textarea
            type="text"
            placeholder="Give us Comment or Feed Back "
          ></textarea>
          <button id="sendBut">Send</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
