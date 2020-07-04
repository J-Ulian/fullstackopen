import React from 'react';

const BlogForm = ({
  addBlog,
  handleTitleChange,
  title,
  url,
  author,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <input onChange={handleTitleChange} value={title} placeholder="Title" />
        <input
          onChange={handleAuthorChange}
          value={author}
          placeholder="Author"
        />
        <input onChange={handleUrlChange} value={url} placeholder="URL" />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
