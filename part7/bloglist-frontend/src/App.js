import React, { useState, useEffect } from 'react';
import Users from './components/Users';
import BlogMUI from './components/BlogMUI';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';
import styled from 'styled-components';
import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';
import { createStore } from 'redux';
import { createBlog, likeIt } from './reducers/blogReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

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
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

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

      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.logoutUser();
  };

  if (!user) {
    return (
      <Container>
        <h2> login to application </h2>{' '}
        <Notification notification={notification} />{' '}
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />{' '}
          </div>{' '}
          <div>
            <TextField
              label="password"
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />{' '}
          </div>{' '}
          <Button variant="contained" color="primary" type="submit" id="login">
            login{' '}
          </Button>{' '}
        </form>{' '}
      </Container>
    );
  }

  const Page = styled.div`
    padding: 1em;
    background: white;
  `;

  const Footer = styled.div`
    padding: 1em;
    margin-top: 1em;
  `;

  return (
    <Router>
      <Container>
        <Page>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/blogs">
                {' '}
                blogs{' '}
              </Button>{' '}
              <Button color="inherit" component={Link} to="/users">
                {' '}
                users{' '}
              </Button>{' '}
              <Button color="inherit" component={Link} to="/">
                {' '}
                home{' '}
              </Button>{' '}
              <Button color="inherit"> login </Button>{' '}
            </Toolbar>{' '}
          </AppBar>{' '}
          <div>
            <h2> blogs </h2> <Notification notification={notification} />{' '}
            {message && <Alert severity="success"> {message} </Alert>}{' '}
            <p>
              {' '}
              {user.name}
              logged in <button onClick={handleLogout}> logout </button>{' '}
            </p>{' '}
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />{' '}
            </Togglable>{' '}
            <div>
              <Switch>
                <Route path="/blogs/:id">
                  <Blog />
                </Route>
                <Route path="/blogs">
                  <br /> <BlogMUI />{' '}
                </Route>
                <Route path="/users">
                  <br /> <Users />{' '}
                </Route>
                <Route path="/">
                  <br />
                  <h2> Just an empty Home Page (navigate to blogs or users)</h2>
                </Route>
              </Switch>
            </div>
          </div>{' '}
          <Footer>
            <em> Note app, Department of Computer Science 2020 </em>{' '}
          </Footer>{' '}
        </Page>{' '}
      </Container>{' '}
    </Router>
  );
};

export default App;

//own={user.username === blog.user.username}
