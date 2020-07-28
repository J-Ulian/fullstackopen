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
import React, { useEffect, useState } from 'react';
import { initializeComments } from '../reducers/commentReducer';
import { createComment } from '../reducers/commentReducer';

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
  console.log(id, typeof id);
  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch]);
  const comments = useSelector(({ comments }) => {
    console.log(comments);
    return comments;
  });

  const [comment, setComment] = useState('');

  const handleNewComment = (event) => {
    event.preventDefault();
    const content = {
      comment,
      id,
    };
    dispatch(createComment(content));

    setComment('');
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <br />
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <h2>Comments</h2>
      <form onSubmit={handleNewComment}>
        <div>
          your comment{' '}
          <input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />{' '}
        </div>{' '}
        <button id="submit"> create </button>{' '}
      </form>{' '}
      <ul>
        {comments.map((comment) => {
          return <li id={comment.id}>{comment.content}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
