import React from "react";
import { images } from "../assets/Images/images";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, Outlet } from "react-router-dom";

const NewsCard = () => {
  return (
    <div className="news-card">
      <img className="news-image" src={images.image6} alt="News" />

      <p className="news-category">Health</p>

      <div className="news-highlight">
        <a href="#" className="news-title-link">
          <h3 className="news-title">Transforming Lives Through Education</h3>
        </a>
        <p className="news-excerpt">
          How education initiatives are empowering children and families in
          underserved communities.
        </p>
      </div>

      <div className="news-meta">
        <p>
          <i className="bi bi-person"></i>
          <span> Sarah Johnson</span>
        </p>
        <p>
          <i className="bi bi-clock"></i>
          <span> 5 min read</span>
        </p>
        <p>
          <i className="bi bi-calendar-date"></i>
          <span> 12/15/2024</span>
        </p>
      </div>

      <a href="#" className="read-more">
        Read More →
      </a>
    </div>
  );
};

export const AllNews = () => {
  return (
    <div className="news-grid all-news">
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </div>
  );
};

export const EducationNews = () => {
  return (
    <div className="news-grid education-news">
      <NewsCard />
    </div>
  );
};

export const HealthNews = () => {
  return (
    <div className="news-grid health-news">
      <NewsCard />
      <NewsCard />
    </div>
  );
};

export const EmergencyNews = () => {
  return (
    <div className="news-grid emergency-news">
      <NewsCard />
      <NewsCard />
    </div>
  );
};

const BlogPage = () => {
  return (
    <div className="blogs-page">
      <NavBar />

      <header className="blogs-header">
        <h4>News & Impact Stories</h4>
        <p>
          Read the latest updates from the field and discover the real impact of
          your support.
        </p>

        <input
          className="search-input"
          type="text"
          placeholder="Search articles"
        />
      </header>

      <nav className="blogs-nav">
        <Link to="articles" className="blog-link">
          All Articles
        </Link>
        <Link to="education" className="blog-link">
          Education
        </Link>
        <Link to="health" className="blog-link">
          Health
        </Link>
        <Link to="emergency" className="blog-link">
          Emergency
        </Link>
      </nav>

      <section className="blogs-content">
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
