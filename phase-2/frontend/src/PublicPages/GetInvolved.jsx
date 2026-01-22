import React, { useState } from "react";
import "./GetInvolved.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { images } from "../assets/Images/images";
import { useUserData } from "../context/UserContext";
import { useDonation } from "../context/DonationContext";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
export const DonationForm = ({ onClose }) => {
  const presetAmounts = ["$25", "$50", "$100", "$250"];

  const [donationType, setDonationType] = useState("monthly");
  const [amount, setAmount] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [donor, setDonor] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });

  const { createDonation } = useDonation();
  const { projects } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      fullName: donor.fullName,
      email: donor.email,
      phone: donor.phone,
      country: donor.country,
      donationType,
      amount: amount.startsWith("$") ? Number(amount.slice(1)) : Number(amount),
      projectId: selectedProject || null,
      currency: "USD",
      paymentMethod: "Credit Card",
    };

    await createDonation(donationData);
  };

  return (
    <div>
      <NavBar />
      <form className="donation-page" onSubmit={handleSubmit}>
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
            value={amount && amount.startsWith("$") ? "" : amount || ""}
            onChange={(e) => setAmount(e.target.value)}
          />
        </section>

        {/* PROJECT SELECTION */}
        <section className="donation-section">
          <h3 className="section-title">Choose Where to Help</h3>

          <label className="donation-card">
            <input
              type="radio"
              name="project"
              value=""
              checked={selectedProject === ""}
              onChange={() => setSelectedProject("")}
            />
            <div className="donation-content">
              <p>General Organization Fund (Where needed most)</p>
            </div>
          </label>

          {projects.map((project) => (
            <label key={project._id} className="donation-card">
              <input
                type="radio"
                name="project"
                value={project._id}
                checked={selectedProject === project._id}
                onChange={() => setSelectedProject(project._id)}
              />
              <div className="donation-content">
                <p>{project.title}</p>
                <small style={{ color: "#666" }}>{project.category}</small>
              </div>
            </label>
          ))}
        </section>

        {/* DONOR INFO */}
        <section className="donation-section donor-information">
          <h3 className="section-title">Your Information</h3>

          <label>Full Name *</label>
          <input
            required
            onChange={(e) => setDonor({ ...donor, fullName: e.target.value })}
          />

          <label>Email *</label>
          <input
            type="email"
            required
            onChange={(e) => setDonor({ ...donor, email: e.target.value })}
          />

          <label>Phone</label>
          <input
            onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
          />

          <label>Country</label>
          <input
            onChange={(e) => setDonor({ ...donor, country: e.target.value })}
          />
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

          <button type="submit" className="main-btn">
            Donate Now
          </button>
        </section>
      </form>
      <Footer />
    </div>
  );
};

export const GetInvolvedDonation = () => {
  const presetAmounts = ["$25", "$50", "$100", "$250"];
  const { amount, setAmount } = useDonation();
  const navigate = useNavigate();

  const handleDonate = () => {
    if (!amount) {
      alert("Please select or enter an amount");
      return;
    }
    navigate("/donate");
  };

  return (
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
        value={amount && amount.startsWith("$") ? "" : amount || ""}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="donate-btn" onClick={handleDonate}>
        Donate
      </button>
    </section>
  );
};

export const VolunteerApplication = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    areaOfInterest: "",
    availability: "",
    description: "",
    status: "pending",
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
            name="fullName"
            value={form.fullName}
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
            <option value="Education Tutor">Education Tutor</option>
            <option value="Health Support">Health Support</option>
            <option value="Environment">Environment</option>
            <option value="Social Work">Social Work</option>
            <option value="Other">Other</option>
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
            <option value="Weekday Mornings">Weekday Mornings</option>
            <option value="Weekday Afternoons">Weekday Afternoons</option>
            <option value="Weekday Evenings">Weekday Evenings</option>
            <option value="Weekends">Weekends</option>
            <option value="Flexible">Flexible</option>
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
      <div className="participate">
        <h2>Ways to Make a Difference</h2>
        <p>
          There are many ways you can help children find love, safety, and hope.
          Your support whether time, skills, or resources creates a brighter
          future.
        </p>
        <section className="participate-sections">
          <div className="card">
            <i
              className="fa-regular fa-heart"
              style={{color: "rgb(241, 137, 17)", fontSize: "2rem"}}
            ></i>
            <h3>Volunteer Your Time</h3>
            <p>
              Join our team of dedicated volunteers and make a direct impact in
              your community.
            </p>
          </div>
          <div className="card">
            <i
              className="fa-regular fa-dollar-sign"
              style={{color: "green", fontSize: "2rem"}}
            ></i>
            <h3>Make a Donation</h3>
            <p>
              Your financial support helps us continue and expand our vital
              programs.
            </p>
          </div>
          <div className="card">
            <i
              className="fa-solid fa-people-group"
              style={{color: "blue", fontSize: "2rem"}}
            ></i>
            <h3>Become a Partner</h3>
            <p>
              Collaborate with us to amplify our impact and reach more children
              in need.
            </p>
          </div>
          <div className="card">
            <i
              className="fa-regular fa-calendar-days"
              style={{color: "rgb(147, 35, 239)", fontSize: "2rem"}}
            ></i>
            <h3>Attend Events</h3>
            <p>
              Participate in our events to show your support and raise awareness
              for our cause.
            </p>
          </div>
        </section>
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
          <GetInvolvedDonation />
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
