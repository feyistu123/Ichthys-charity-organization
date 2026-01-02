import React from "react";
import "./About.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { images } from "../assets/Images/images";
import ImageSlider from "../components/ImageSlider";
const AboutPage = () => {
  return (
    <div>
      <NavBar />
      <div id=" about">
        <div id="intro-about">
          <h1>About Ichthys</h1>
          <p>
            A dedication to empowering communities and transforming lives
            through education, support, and opportunity
          </p>
        </div>
        <div id="ngo-mission">
          <img src={images.children} alt="Children Image" id="children-pic" />
          <div>
            <h2>Our Story</h2>
            <p>
              Ichthys began in 2015 with a simple but powerful idea: that every
              community has untapped potential waiting to be unlocked. What
              started as a small group of volunteers tutoring students after
              school has grown into a comprehensive organization serving
              thousands across multiple communities. We've seen firsthand how
              access to quality education, skills training, and a supportive
              community can transform lives. Our programs are designed not just
              to provide immediate assistance, but to create sustainable,
              long-term change. Today, we're proud to work alongside dedicated
              volunteers, generous donors, and passionate community partners who
              share our vision of a world where everyone has the opportunity to
              thrive.
            </p>
          </div>
        </div>

        <div id="principles">
          <div class="values-one">
            <i class="bi bi-bullseye"></i>
            <h3>Our Mission</h3>
            <p>
              At Ichthys (ἰχθύς) Charity, our mission is to reflect the love of
              Christ by restoring hope, dignity, and opportunity to vulnerable
              children and families in Ethiopia. Rooted in the ancient Christian
              symbol of the Ichthys a sign of faith, compassion, and salvation
              we are committed to serving those in need with humility,
              integrity, and unconditional love.
            </p>
          </div>
          <div class="values-two">
            <i class="bi bi-eye"></i>
            <h3>Our vision</h3>
            <p>
              A world where every person, regardless of their background or
              circumstances, has access to the resources, support, and
              opportunities they need to reach their full potential.
            </p>
          </div>
          <div id="cors">
            <div id="core-head">
              <h3>Our Core Values</h3>
              <p>The principles that guide our work and define who we are</p>
            </div>
            <div id="core-values">
              <div class="core-value-one">
                <i class="bi bi-heart"></i>
                <h3>Compassion</h3>
                <p>We lead with empathy and understanding in all we do.</p>
              </div>
              <div class="core-value-two">
                <i class="bi bi-people"></i>
                <h3>Community</h3>
                <p>Together, we are stronger and can achieve more.</p>
              </div>

              <div class="core-value-three">
                <i class="bi bi-trophy"></i>
                <h3>Excellence</h3>
                <p>We strive for the highest quality in our programs.</p>
              </div>
              <div class="core-value-four">
                <i class="bi bi-globe"></i>
                <h3>Inclusivity</h3>
                <p>Everyone deserves opportunity, regardless of background.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="Gallery">
          <h1>Gallery</h1>
          <ImageSlider />
          {/* <div id="images">
            <img src={images.images1} />
            <img src={images.image2} />
            <img src={images.image3} />
            <img src={images.image4} />
            <img src={images.image5} />
            <img src={images.image6} />
          </div> */}
        </div>
      </div>
      <div id="impacts-section">
        <div id="impact-head">
          <h3>Our Impact in Numbers</h3>
          <p>Real results from our commitment to communities</p>
        </div>
        <div id="impacts-list">
          <div>
            <i class="bi bi-lightning-charge"></i>
            <h3>50,000</h3>
            <p>Lives Impacted</p>
          </div>

          <div>
            <i class="bi bi-person-raised-hand"></i>

            <h3>1,200 +</h3>
            <p>Active Volunteers</p>
          </div>
          <div>
            <i class="bi bi-check-circle-fill text-success"></i>
            <h3>85 %</h3>
            <p>Success Rate</p>
          </div>
          <div>
            <i class="bi bi-people"></i>
            <h3>30 +</h3>
            <p>Communities</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
