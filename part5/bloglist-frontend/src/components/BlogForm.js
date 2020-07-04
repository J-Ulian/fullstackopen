import React, { useState } from 'react';

const BlogForm = ({
  addBlog,
  handleTitleChange,
  title,
  url,
  author,
  handleAuthorChange,
  handleUrlChange,
}) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false);
  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' };
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' };
  const toggleVisibility = () => {
    setAddBlogVisible(!addBlogVisible);
  };
  return (
    <div>
      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>show add blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <input
            onChange={handleTitleChange}
            value={title}
            placeholder="Title"
          />
          <input
            onChange={handleAuthorChange}
            value={author}
            placeholder="Author"
          />
          <input onChange={handleUrlChange} value={url} placeholder="URL" />
          <button type="submit">save</button>
        </form>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default BlogForm;
