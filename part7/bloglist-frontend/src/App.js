import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogMUI from './components/BlogMUI';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';

import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Toolbar,
  AppBar,
  IconButton,
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = React.createRef();

  const padding = {
    padding: 5,
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const notifyWith = (message, type = 'success') => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUsername('');
      setPassword('');
      setUser(user);
      //notifyWith(`${user.name} welcome back!`);
      setMessage(`${user.name} welcome back!`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
      storage.saveUser(user);
    } catch (exception) {
      notifyWith('wrong username/password', 'error');
    }
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };
    await blogService.update(likedBlog);
    setBlogs(
      blogs.map((b) =>
        b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b
      )
    );
  };

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    );
    if (ok) {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.logoutUser();
  };

  if (!user) {
    return (
      <Container>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              label="password"
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="contained" color="primary" type="submit" id="login">
            login
          </Button>
        </form>
      </Container>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const link = () => {};

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">home</Button>
            <Button color="inherit">blogs</Button>
            <Button color="inherit">users</Button>

            <Button color="inherit">login</Button>
          </Toolbar>
        </AppBar>
        <div>
          <h2>blogs</h2>

          <Notification notification={notification} />

          {message && <Alert severity="success">{message}</Alert>}

          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>

          {blogs.sort(byLikes).map((blog) => (
            <BlogMUI
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              own={user.username === blog.user.username}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default App;
