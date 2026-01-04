import React from "react";

const EditPost = ({ postData, onClose }) => {
  const { editPost } = useData();

  const [post, setPost] = useState({ ...projectData });

  const handleChange = (e) => {
    let value = e.target.value;
    setPost({ ...post, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost({ id: postData.id, upDatedData: postData });
    console.log("Post edited:", postData);
    onClose();
  };
  return (
    <div>
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
          className="post-input textarea"
          placeholder="Description"
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
          <option value="Environment" />
          <option value="Community" />
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
      </form>
    </div>
  );
};

export default EditPost;
