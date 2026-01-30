import React from "react";
import { images } from "../assets/Images/images";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useState } from "react";
const NewsCard = ({ post }) => {
  return (
    <div className="news-card">
      <img
        className="news-image"
        src={post.imageUrl || images.image6}
        alt="post Image"
      />

      <p className="news-category">{post.category}</p>

      <div className="news-highlight">
        <a href="#" className="news-title-link">
          <h3 className="news-title">{post.title}</h3>
        </a>
        <p className="news-excerpt">{post.content}</p>
      </div>

      <div className="news-meta">
        <p>
          <i className="bi bi-person"></i>
          <span>{post.author}</span>
        </p>
        <p>
          <i className="bi bi-calendar-date"></i>
          <span> {post.publishedDate}</span>
        </p>
      </div>
    </div>
  );
};

export const AllNews = () => {
  const { posts } = useData();
  const { searchTerm = "" } = useOutletContext() || {};

  const filteredPosts = posts.filter((p) =>
    (p?.title || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="news-grid all-news">
      {filteredPosts.length === 0 ? (
        <h3>There are no news</h3>
      ) : (
        filteredPosts.map((p) => <NewsCard key={p._id} post={p} />)
      )}
    </div>
  );
};

export const EducationNews = () => {
  const { posts } = useData();
  const { searchTerm = "" } = useOutletContext() || {};

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = p.category === "Education";
    const matchesSearch =
      searchTerm === "" ||
      (p?.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="news-grid education-news">
      {filteredPosts.length === 0 ? (
        <h3>There are no news</h3>
      ) : (
        filteredPosts.map((p) => <NewsCard key={p._id} post={p} />)
      )}
    </div>
  );
};

export const HealthNews = () => {
  const { posts } = useData();
  const { searchTerm = "" } = useOutletContext() || {};

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = p.category === "Health";
    const matchesSearch =
      searchTerm === "" ||
      (p?.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="news-grid health-news">
      {filteredPosts.length === 0 ? (
        <h3>There are no news</h3>
      ) : (
        filteredPosts.map((p) => <NewsCard key={p._id} post={p} />)
      )}
    </div>
  );
};

export const EmergencyNews = () => {
  const { posts } = useData();
  const { searchTerm = "" } = useOutletContext() || {};

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = p.category === "Emergency";
    const matchesSearch =
      searchTerm === "" ||
      (p?.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="news-grid emergency-news">
      {filteredPosts.length === 0 ? (
        <h3>There are no news</h3>
      ) : (
        filteredPosts.map((p) => <NewsCard key={p._id} post={p} />)
      )}
    </div>
  );
};

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="blogs-page">
      <NavBar />

      <header className="blogs-header">
        <div className="blogs-heading-text">
          <h4>News & Impact Stories</h4>
          <p>
            Read the latest updates from the field and discover the real impact
            of your support.
          </p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <nav className="blogs-nav">
        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? "blog-link active" : "blog-link"
          }
        >
          All Articles
        </NavLink>
        <NavLink
          to="education"
          className={({ isActive }) =>
            isActive ? "blog-link active" : "blog-link"
          }
        >
          Education
        </NavLink>
        <NavLink
          to="health"
          className={({ isActive }) =>
            isActive ? "blog-link active" : "blog-link"
          }
        >
          Health
        </NavLink>
        <NavLink
          to="emergency"
          className={({ isActive }) =>
            isActive ? "blog-link active" : "blog-link"
          }
        >
          Emergency
        </NavLink>
      </nav>

      <section className="blogs-content">
        {/* Pass searchTerm to child routes via context or Outlet context */}
        <Outlet context={{ searchTerm }} />
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
