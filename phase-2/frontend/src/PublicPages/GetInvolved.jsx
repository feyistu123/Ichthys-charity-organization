import React, { useState } from "react";
import "./GetInvolved.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { images } from "../assets/Images/images";
export const DonationForm = () => {
  return (
    <div class="donation-amounts">
      <input id="amount" type="text" placeholder="Full Name" />
      <br />
      <input id="amount" type="email" placeholder="Email" />
      <br />

      <input id="amount" type="text" placeholder="Custom amount" />
      <select name="money-type" required>
        <option disabled>money type</option>
        <option value="etb">ETB</option>
        <option value="dollar">USD</option>
      </select>
      <button>Donate Now</button>
      <button>Give Monthly</button>
    </div>
  );
};
const GetInvolved = () => {
  return (
    <div>
      <NavBar />
      <div class="involved-section">
        <div class="overlay">
          <img src={images.involve} alt="Get Involved" />
        </div>
        <div class="img-title">
          <h1>Get Involved</h1>
          <p class="impact-text">
            Meaningful change isn't just for experts. Any amount of time or
            resource you share fuels our success
          </p>
        </div>
      </div>
      <section id="donation-form" class="donation-container">
        <div class="donation-text">
          <h2>Support Through Giving</h2>
          <p>
            Your donations help us provide essential services and create lasting
            change for children in need. Every contribution, big or small, makes
            a difference.
          </p>
          <ul>
            <li>
              <strong>100% tax-deductible:</strong> We provide receipts for your
              records.
            </li>
            <li>
              <strong>Secure online processing:</strong> Your payment
              information is protected.
            </li>
            <li>
              <strong>Monthly or one-time options:</strong> Flexible giving to
              suit your budget.
            </li>
            <li>
              <strong>Direct impact on communities:</strong> Donations go
              straight to program delivery.
            </li>
          </ul>
        </div>
        <div class="donation-site">
          <h3>Choose Your Donation Amount</h3>
          <DonationForm />
          <p class="microcopy">
            You’ll receive an email receipt for tax purposes. Cancel or change
            monthly gifts anytime.
          </p>
        </div>
      </section>
      <article class="role">
        <h2>Volunteer Roles Available</h2>
        <p>Find the perfect role that matches your skills and availability</p>
        <div class="role-cards">
          <div class="role-card">
            <h3>Education Tutor</h3>
            <div class="time-location">
              <span>
                <i class="fa-regular fa-clock"></i> 2-4 hours/week
              </span>
              <span>
                <i class="fa fa-location-dot"></i> Community Learning Center
              </span>
            </div>
            <p id="description">
              Support students with homework, reading, and academic
              skill-building.
            </p>
          </div>
          <div class="role-card">
            <h3>Event Coordinator</h3>
            <div class="time-location">
              <span>
                <i class="fa-regular fa-clock"></i> Flexible
              </span>
              <span>
                <i class="fa fa-location-dot"></i> Various locations
              </span>
            </div>
            <p id="description">
              Assist in planning and executing community events.
            </p>
          </div>
          <div class="role-card">
            <h3>Mentorship Program</h3>
            <div class="time-location">
              <span>
                <i class="fa-regular fa-clock"></i> 1-2 hours/week
              </span>
              <span>
                <i class="fa fa-location-dot"></i> Virtual or In-person
              </span>
            </div>
            <p id="description">
              Provide guidance to young adults as they build life skills and
              explore career opportunities.
            </p>
          </div>
          <div class="role-card">
            <h3>Administrative Support</h3>
            <div class="time-location">
              <span>
                <i class="fa-regular fa-clock"></i> 4-8 hours/week
              </span>
              <span>
                <i class="fa fa-location-dot"></i> Office
              </span>
            </div>
            <p id="description">
              Help with office tasks, data entry, and communications.
            </p>
          </div>
        </div>
      </article>

      <div class="signup">
        <h2>Volunteer Signup</h2>
        <p>Ready to make a difference? Sign up to volunteer today!</p>
        <form class="signup-form">
          <div class="input">
            <label>Full Name *</label>
            <input type="text" name="name" required />
          </div>
          <div class="input">
            <label>Email Address *</label>
            <input type="email" name="email" required />
          </div>
          <div class="input">
            <label>Phone Number</label>
            <input type="tel" name="phone" />
          </div>
          <div class="input">
            <label>Location</label>
            <input type="text" name="location" />
          </div>
          <div class="select-input full-width">
            <label>Area of Interest *</label>
            <select name="role" required>
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="education-tutor">Education Tutor</option>
              <option value="event-coordinator">Event Coordinator</option>
              <option value="mentorship-program">Mentorship Program</option>
              <option value="administrative-support">
                Administrative Support
              </option>
            </select>
          </div>
          <div class="select-input full-width">
            <label>Availability *</label>
            <select name="availability" required>
              <option value="" disabled selected>
                Select your availability
              </option>
              <option value="weekday-mornings">Weekday Mornings</option>
              <option value="weekday-afternoons">Weekday Afternoons</option>
              <option value="weekday-evenings">Weekday Evenings</option>
              <option value="weekends">Weekends</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <div class="textarea-input full-width">
            <label>Tell us about yourself</label>
            <textarea placeholder="Share your skills, experience..."></textarea>
          </div>
          <button type="submit">Submit Aplication</button>
        </form>
      </div>
      <div class="other-ways">
        <h2>Other Ways to Support</h2>
        <p>
          Your involvement can take many forms. Explore additional ways to
          contribute to our mission.
        </p>
        <div class="help-methods">
          <div>
            <h3>Fundraising</h3>
            <p>Organize events or campaigns to raise funds.</p>
          </div>
          <div>
            <h3>Spread the Word</h3>
            <p>
              Share our mission on social media and help us reach more people
              who need support.
            </p>
          </div>
          <div>
            <h3>Corporate Partners</h3>
            <p>
              Partner with us for employee volunteer programs and matching gift
              campaigns.
            </p>
          </div>
          <div>
            <h3>In-Kind Donations</h3>
            <p>
              Contribute supplies, equipment, or services that support our
              programs.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GetInvolved;
