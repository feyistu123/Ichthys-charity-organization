import React, { useState } from "react";
import "./GetInvolved.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { images } from "../assets/Images/images";
import { useUserData } from "../context/UserContext";

export const DonationForm = () => {
  const presetAmounts = ["$25", "$50", "$100", "$250"];

  const [donationType, setDonationType] = useState("monthly");
  const [amount, setAmount] = useState("");
  const [cause, setCause] = useState("general");

  return (
    <div className="donation-page">
      {/* INTRO */}
      <div className="donation-intro">
        <h3>Make a Donation</h3>
        <p>
          Your generosity helps us continue our mission to create positive
          change. Every donation makes an impact.
        </p>
      </div>

      {/* DONATION TYPE */}
      <section className="donation-section">
        <h3 className="section-title">Donation Type</h3>

        <label className="donation-card">
          <input
            type="radio"
            name="donationType"
            value="one-time"
            checked={donationType === "one-time"}
            onChange={() => setDonationType("one-time")}
          />
          <div className="donation-content">
            <h4>One-Time Donation</h4>
            <p>Make a single contribution</p>
          </div>
        </label>

        <label className="donation-card recommended">
          <input
            type="radio"
            name="donationType"
            value="monthly"
            checked={donationType === "monthly"}
            onChange={() => setDonationType("monthly")}
          />
          <div className="donation-content">
            <h4>Monthly Donation</h4>
            <p>Ongoing support every month</p>
          </div>
          <span className="recommended-badge">Recommended</span>
        </label>
      </section>

      {/* AMOUNT */}
      <section className="donation-section">
        <h3 className="section-title">Choose Your Donation Amount</h3>

        <div className="donation-grid">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              className={amount === amt ? "active" : ""}
              onClick={() => setAmount(amt)}
            >
              {amt}
            </button>
          ))}
        </div>

        <input
          type="number"
          className="custom-amount-input"
          placeholder="Custom amount"
          value={amount.startsWith("$") ? "" : amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </section>

      {/* CAUSE */}
      <section className="donation-section">
        <h3 className="section-title">Choose Where to Help</h3>

        {[
          { value: "general", label: "Where needed most (General Fund)" },
          { value: "schools", label: "Build Schools in Rural Communities" },
          { value: "health", label: "Mobile Health Clinics" },
          { value: "food", label: "Emergency Food Relief" },
        ].map((item) => (
          <label key={item.value} className="donation-card">
            <input
              type="radio"
              name="cause"
              value={item.value}
              checked={cause === item.value}
              onChange={() => setCause(item.value)}
            />
            <div className="donation-content">
              <p>{item.label}</p>
            </div>
          </label>
        ))}
      </section>

      {/* DONOR INFO */}
      <section className="donation-section donor-information">
        <h3 className="section-title">Your Information</h3>

        <label htmlFor="fullName">Full Name *</label>
        <input id="fullName" required />

        <label htmlFor="email">Email *</label>
        <input id="email" type="email" required />

        <label htmlFor="phone">Phone *</label>
        <input id="phone" />

        <label htmlFor="country">Country *</label>
        <input id="country" />
      </section>

      {/* PAYMENT */}
      <section className="donation-section donation-card">
        <h3 className="section-title">Payment Method</h3>

        <div className="form-group">
          <label>Card Number *</label>
          <input placeholder="1234 5678 9012 3456" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry *</label>
            <input placeholder="MM/YY" />
          </div>
          <div className="form-group">
            <label>CVV *</label>
            <input placeholder="123" />
          </div>
        </div>

        <p className="secure-text">
          Secured by Stripe. Your payment is encrypted.
        </p>

        <button className="main-btn">Donate Now</button>
      </section>
    </div>
  );
};

const getInvolvedDonation = () => {
  const presetAmounts = ["$25", "$50", "$100", "$250"];
  const [customAmount, setCustomAmount] = useState("");
  return (
    <div className="donation-card">
      <h3 className="donation-title">Choose Your Donation Amount</h3>

      <div className="donation-grid">
        {presetAmounts.map((amount) => (
          <button key={amount} type="button">
            {amount}
          </button>
        ))}
      </div>
      <div>
        <input
          type="text"
          className="custom-amount-input"
          placeholder="Custom amount"
          value={customAmount}
        />
        <button className="donate-now-btn">Donate Now</button>
        <p className="secure-text">Secure payment powered by Stripe</p>
      </div>
    </div>
  );
};

export const VolunteerApplication = () => {
  const initialValues = {
    fulName: "",
    email: "",
    phoneNumber: "",
    location: "",
    areaOfInterest: "",
    availability: "",
    description: "",
  };

  const [form, setForm] = useState(initialValues);
  const { signUpVolunteer } = useUserData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpVolunteer(form);
      alert("Application submitted successfully!");
      setForm(initialValues);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <div className="signup">
      <h2>Volunteer Application</h2>
      <p>
        Ready to make a difference? Fill out the form below and we'll get in
        touch with you soon.
      </p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input">
          <label>Full Name *</label>
          <input
            type="text"
            name="fulName"
            value={form.fulName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <div className="select-input full-width">
          <label>Area of Interest *</label>
          <select
            name="areaOfInterest"
            value={form.areaOfInterest}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="education tutor">education tutor</option>
            <option value="event coordinator">event coordinator</option>
            <option value="mentorship program">mentorship program</option>
            <option value="administrative support">
              administrative support
            </option>
            <option value="health support">health support</option>
            <option value="food support">food support</option>
          </select>
        </div>
        <div className="select-input full-width">
          <label>Availability *</label>
          <select
            name="availability"
            value={form.availability}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your availability
            </option>
            <option value="weekday mornings">weekday mornings</option>
            <option value="weekday afternoons">weekday afternoons</option>
            <option value="weekday evenings">weekday evenings</option>
            <option value="weekends">weekends</option>
            <option value="flexible">flexible</option>
          </select>
        </div>
        <div className="textarea-input full-width">
          <label>Tell us about yourself</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Share your skills, experience..."
          ></textarea>
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

const GetInvolved = () => {
  return (
    <div>
      <NavBar />
      <div className="involved-section">
        <div className="overlay">
          <img src={images.involve} alt="Get Involved" />
        </div>
        <div className="img-title">
          <h1>Get Involved</h1>
          <p className="impact-text">
            Meaningful change isn't just for experts. Any amount of time or
            resource you share fuels our success
          </p>
        </div>
      </div>

      <section id="donation-form" className="donation-container">
        <div className="donation-text">
          <h2>Support Through Giving</h2>
          <p>
            Your donations help us provide essential services and create lasting
            change for children in need.
          </p>
          <ul>
            <li>
              <strong>100% tax-deductible:</strong> We provide receipts.
            </li>
            <li>
              <strong>Secure online processing:</strong> Protected data.
            </li>
            <li>
              <strong>Monthly or one-time options:</strong> Flexible giving.
            </li>
            <li>
              <strong>Direct impact:</strong> Straight to program delivery.
            </li>
          </ul>
        </div>
        <div className="donation-site">
          <h3>Choose Your Donation Amount</h3>
          <getInvolvedDonation />
          <p className="microcopy">
            You’ll receive an email receipt for tax purposes.
          </p>
        </div>
      </section>

      <article className="role">
        <h2>Volunteer Roles Available</h2>
        <p>Find the perfect role that matches your skills and availability</p>
        <div className="role-cards">
          {[
            {
              title: "Education Tutor",
              time: "2-4 hours/week",
              loc: "Learning Center",
              desc: "Support students with homework.",
            },
            {
              title: "Event Coordinator",
              time: "Flexible",
              loc: "Various locations",
              desc: "Plan community events.",
            },
            {
              title: "Mentorship Program",
              time: "1-2 hours/week",
              loc: "Virtual/In-person",
              desc: "Provide guidance to young adults.",
            },
            {
              title: "Administrative Support",
              time: "4-8 hours/week",
              loc: "Office",
              desc: "Help with data entry.",
            },
          ].map((role, index) => (
            <div key={index} className="role-card">
              <h3>{role.title}</h3>
              <div className="time-location">
                <span>
                  <i className="fa-regular fa-clock"></i> {role.time}
                </span>
                <span>
                  <i className="fa fa-location-dot"></i> {role.loc}
                </span>
              </div>
              <p className="role-description">{role.desc}</p>
            </div>
          ))}
        </div>
      </article>

      <VolunteerApplication />

      <div className="other-ways">
        <h2>Other Ways to Support</h2>
        <div className="help-methods">
          <div>
            <h3>Fundraising</h3>
            <p>Organize events or campaigns.</p>
          </div>
          <div>
            <h3>Spread the Word</h3>
            <p>Share our mission on social media.</p>
          </div>
          <div>
            <h3>Corporate Partners</h3>
            <p>Partner for employee programs.</p>
          </div>
          <div>
            <h3>In-Kind Donations</h3>
            <p>Contribute supplies or services.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GetInvolved;
