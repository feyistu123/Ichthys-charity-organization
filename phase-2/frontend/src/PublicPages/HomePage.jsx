import React from "react";
import "./HomePage.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { images } from "../assets/Images/images";

const HomePage = () => {
  return (
    <div id="home">
      <NavBar />

      <div id="background">
        <div className="overlay"></div>
        <h1>Building Hope, Transforming Lives</h1>
        <p className="one">
          <em>
            "Whoever is kind to the poor lends to the LORD, and he will reward
            them for what they have done."
            <br />
            <sub>Proverbs 19:17</sub>
          </em>
        </p>
        <div className="button-group">
          <a href="../GetInvolved/get_involved.html">
            <button className="btn involved">Get Involved</button>
          </a>
          <a href="../About/About.html">
            <button className="btn learn">Learn More</button>
          </a>
        </div>
      </div>
      <div id="mission">
        <div id="para">
          <h1 className="one">Our Mission</h1>
          <p>
            At Ichthys (ἰχθύς) Charity, our mission is to reflect the love of
            Christ by restoring hope, dignity, and opportunity to vulnerable
            children and families in Ethiopia. Rooted in the ancient Christian
            symbol of the Ichthys a sign of faith, compassion, and salvation we
            are committed to serving those in need with humility, integrity, and
            unconditional love.
          </p>
          <ul>
            <p> We strive to:</p>
            <li>
              Provide safety, support, and essential care for children facing
              hardship.
            </li>
            <li>
              Strengthen families through spiritual guidance, education, and
              empowerment.
            </li>
            <li>
              Uphold Christian values by serving with kindness, mercy, and
              respect for every human life.
            </li>
            <li>
              Build communities where every child can grow in faith, thrive in
              health, and achieve their God given potential.
            </li>
          </ul>

          <p>
            Guided by faith, inspired by compassion, and devoted to service,
            Ichthys Charity works to build a brighter future one child, one
            family, and one act of love at a time.
          </p>
        </div>
        <div id="para-image">
          <img src={images.mission} alt="children image" />
        </div>
      </div>
      <div id="cores">
        <div id="core-head">
          <h2>Our Programs</h2>
          <p>
            Comprehensive initiatives designed to create meaningful and lasting change
          </p>
        </div>
        <div id="core-values">
          <div className="core-value-one">
            <i className="bi bi-heart"></i>
            <h3>Education Support</h3>
            <p>
              Providing quality education resources and scholarships to underserved communities.{" "}
            </p>
          </div>

          <div className="core-value-two">
            <i className="bi bi-people"></i>
            <h3>Community Building</h3>
            <p>
              Creating spaces and opportunities for communities to grow and thrive together.
            </p>
          </div>

          <div className="core-value-three">
            <i className="bi bi-trophy"></i>
            <h3>Skill Training</h3>
            <p>
              Empowering individuals with practical skills for sustainable livelihoods.
            </p>
          </div>
        </div>
      </div>
      <div id="difference-section">
        <div id="diff-head">
          <h3>Make a Difference Today</h3>
          <p>
            Your generous donation helps us continue our vital work nurturing
            children in need. Every contribution no matter the size, provides
            essential care and creates brighter futures.
          </p>

          <div className="button-group">
            <button className="donate-btn one-time">One-Time Donation</button>
            <button className="donate-btn monthly">Monthly Giving</button>
          </div>
        </div>

        <div className="sec">
          <div id="range">
            <h3>Where Your Donation Goes</h3>

            <form>
              <label>Education Programs — 45%</label>
              <br />
              <input
                type="range"
                className="donation-range "
                id="educationRange"
                min="0"
                max="100"
                value="45"
                disabled
              />
              <br />

              <label>Healthy Eating — 30%</label>
              <br />
              <input
                type="range"
                className="donation-range "
                id="eatingRange"
                min="0"
                max="100"
                value="30"
                disabled
              />
              <br />

              <label>Daily Operations — 25%</label>
              <br />
              <input
                type="range"
                className="donation-range "
                id="operationsRange"
                min="0"
                max="100"
                value="25"
                disabled
              />
            </form>
          </div>
        </div>
      </div>
      <section className="css-slider-section">
        <h2>What People Say About Us</h2>

        <div className="css-slider">
          <div className="slide">
            <img src={images.marta} alt="Person 1" />
            <p>
              “Ichthys brought hope to our family. My children now have
              education and warm meals every day.”
            </p>
            <h4>- Marta, Mother</h4>
            <div className="stars">★★★★★</div>
          </div>

          <div className="slide">
            <img src={images.teddy} alt="Person 2" />
            <p>
              “Volunteering here changed my life. I witnessed love, care, and
              true passion for helping children.”
            </p>
            <h4>- Teddy, Volunteer</h4>
            <div className="stars">★★★★★</div>
          </div>

          <div className="slide">
            <img src={images.helen} alt="Person 3" />
            <p>
              “I saw exactly where my donation went. Ichthys creates real impact
              in real communities.”
            </p>
            <h4>- Helen, Donor</h4>
            <div className="stars">★★★★☆</div>
          </div>

          <div className="slide">
            <img src={images.abel} alt="Person 4" />
            <p>
              “I volunteered for three months, and the care, love, and
              commitment I saw were inspiring. Ichthys is making real change.”
            </p>
            <h4>- Abel, Volunteer </h4>
            <div className="stars">★★★★☆</div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
