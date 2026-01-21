import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import Modal from "./Modal";
import CreatePost from "../components/CreatePost";
import EditPost from "../components/EditPost";

const Blogs = () => {
  const { posts, deletePost } = useData();
  const [createPost, setCreatePost] = useState(false);
  const [isEditingPost, setEditingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
  };

  const toggleDescription = (postId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const truncateText = (text, limit = 100) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h2>Blog Management</h2>
        <button className="new-blog" onClick={() => setCreatePost(true)}>
          <i className="bi bi-plus-circle"></i> Add New Post
        </button>
      </div>
      
      <div className="blogs-list">
        {!posts || posts.length === 0 ? (
          <h3>No blog posts available</h3>
        ) : (
          posts.map((post) => (
          <div key={post._id} className="blog-card">
            <div className="blog-header">
              <h3 className="blog-title">{post.title}</h3>
              <span className="blog-badge">{post.category}</span>
            </div>

            <div className="blog-description">
              {expandedDescriptions[post._id] ? (
                <p>{post.content}</p>
              ) : (
                <p>{truncateText(post.content)}</p>
              )}
              {post.content.length > 100 && (
                <span 
                  className="read-more-link"
                  onClick={() => toggleDescription(post._id)}
                >
                  {expandedDescriptions[post._id] ? 'Show less' : 'Read more'}
                </span>
              )}
            </div>

            <div className="blog-footer">
              <span>By {post.author}</span>
              <span>• {post.publishedDate}</span>
            </div>

            <div className="blog-actions">
              <div className="dropdown-container">
                <button
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown(post._id)}
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
                {dropdownOpen === post._id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item edit-item"
                      onClick={() => {
                        setSelectedPost(post);
                        setEditingPost(true);
                        setDropdownOpen(null);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      className="dropdown-item delete-item"
                      onClick={() => {
                        deletePost(post._id);
                        setDropdownOpen(null);
                      }}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
      
      {createPost && (
        <Modal onClose={() => setCreatePost(false)}>
          <CreatePost onClose={() => setCreatePost(false)} />
        </Modal>
      )}
      {isEditingPost && (
        <Modal onClose={() => setEditingPost(false)}>
          <EditPost
            onClose={() => setEditingPost(false)}
            postData={selectedPost}
          />
        </Modal>
      )}
    </div>
  );
};

export default Blogs;
