import React from 'react';
const Blog = ({ blog, moreLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.author}
      <br />
      {blog.likes}
      <button onClick={moreLikes}>like</button>
      <br />
      {blog.url}
    </div>
  );
};

export default Blog;
