import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes;
        })
      )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  const moreLikes = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          `Blog '${blog.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const logoutForm = () => (
    <div>
      <p>
        {' '}
        {user.name} logged in <button onClick={handleLogout}> logout </button>{' '}
      </p>{' '}
    </div>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />{' '}
        </Togglable>{' '}
      </div>
    );
  };

  return (
    <div>
      <h2> blogs </h2> <Notification message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />{' '}
        </Togglable>
      ) : (
        <div>
          {' '}
          {logoutForm()} <br />{' '}
          {blogs.map((blog) => (
            <div key={blog.id}>
              {' '}
              {blog.title}{' '}
              <Togglable buttonLabel="view">
                <Blog
                  key={blog.id}
                  blog={blog}
                  moreLikes={() => moreLikes(blog.id)}
                />{' '}
              </Togglable>{' '}
              <br />
            </div>
          ))}{' '}
          {blogForm()}{' '}
        </div>
      )}{' '}
    </div>
  );
};

export default App;
