import React, { useState } from "react";
import { useData } from "../context/DataContext";
import Modal from "./Modal";
import CreatePost from "../components/CreatePost";
import EditPost from "../components/EditPost";

const Blogs = () => {
  const { posts, deletePost } = useData();
  const [createPost, setCreatePost] = useState(false);
  const [isEditingPost, setEditingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="blogs-container">
      {!posts || posts.length === 0 ? (
        <h3>No blog posts available</h3>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="blog-card">
            <div className="blog-header">
              <h3 className="blog-title">{post.title}</h3>
              <span className="blog-badge">{post.category}</span>
            </div>

            <p className="blog-description">{post.content}</p>

            <div className="blog-footer">
              <span>By {post.author}</span>
              <span>• {post.publishedDate}</span>
              {/* <span>• {post.readTime}</span> */}
            </div>
            <div className="project-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setSelectedPost(post);
                  setEditingPost(true);
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePost(post._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}
      <button onClick={() => setCreatePost(true)}>Add New Post</button>

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
