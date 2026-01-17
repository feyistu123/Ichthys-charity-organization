import React, { useState } from "react";
import { useData } from "../context/DataContext";

const CreatePost = ({ onClose }) => {
  const initials = {
    title: "",
    content: "",
    category: "",
    author: "",
    publishedDate: "",
    image: null,
  };

  const [post, setPost] = useState(initials);
  const { createPost } = useData();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setPost({ ...post, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(post);
    setPost(initials);
    onClose && onClose();
  };

  return (
    <div className="create-post-container">
      <h2 className="form-title">Create New Post</h2>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          className="post-input"
          placeholder="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={post.title}
          required
        />

        <textarea
          className="post-input post-textarea"
          placeholder="Content"
          name="content"
          onChange={handleChange}
          value={post.content}
          required
        />

        <input
          className="post-input"
          placeholder="Category"
          type="text"
          list="category-list"
          name="category"
          onChange={handleChange}
          value={post.category}
          required
        />

        <datalist id="category-list">
          <option value="Education" />
          <option value="Health" />
          <option value="Emergency" />
        </datalist>

        <input
          className="post-input"
          placeholder="Author"
          type="text"
          name="author"
          onChange={handleChange}
          value={post.author}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="post-input"
        />

        <button type="submit" className="post-submit-btn">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
