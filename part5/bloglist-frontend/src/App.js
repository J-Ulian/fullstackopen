import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addBlogVisible, setAddBlogVisible] = useState(false);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      url,
      author,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(`a new blog ${title} ${author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setTitle('');
      setUrl('');
      setAuthor('');
    });
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const logoutForm = () => (
    <div>
      <p>
        {user.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
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
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' };
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={setAddBlogVisible}>show add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            handleTitleChange={({ target }) => setTitle(target.value)}
            title={title}
            handleAuthorChange={handleAuthorChange}
            author={author}
            handleUrlChange={handleUrlChange}
            url={url}
          />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          {logoutForm()}
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
