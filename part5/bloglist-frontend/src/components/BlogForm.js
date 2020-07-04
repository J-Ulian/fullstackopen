import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const [blogs, setBlogs] = useState([]);

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      url,
      author,
    });
    setTitle('');
    setUrl('');
    setAuthor('');
  };
  return (
    <div>
      <h2> create new </h2>

      <form onSubmit={addBlog}>
        <input onChange={handleTitleChange} value={title} placeholder="Title" />
        <input
          onChange={handleAuthorChange}
          value={author}
          placeholder="Author"
        />
        <input onChange={handleUrlChange} value={url} placeholder="URL" />
        <button type="submit"> save </button>
      </form>
    </div>
  );
};

export default BlogForm;
