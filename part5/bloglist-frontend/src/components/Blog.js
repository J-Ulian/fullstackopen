import React from 'react';
const Blog = ({ blog, moreLikes, del }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div className="blog" style={blogStyle}>
      {' '}
      {blog.author} <br />
      <div> {blog.likes} </div>{' '}
      <button onClick={moreLikes}> like this post </button>{' '}
      <button onClick={del}> delete this post </button> <br /> {blog.url}{' '}
    </div>
  );
};

export default Blog;
