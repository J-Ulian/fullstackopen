import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';
import React from 'react';

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => {
    console.log(blogs);
    return blogs;
  });
  const id = useParams().id;
  const blog = blogs.find((n) => {
    console.log(n.id);
    return n.id === id;
  });
  console.log(blog);
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
    </div>
  );
};

export default Blog;
