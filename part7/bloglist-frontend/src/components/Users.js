import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

const Users = () => {
  const [visible, setVisible] = useState(false);

  const label = visible ? 'hide' : 'view';

  const dispatch = useDispatch();
  const users = useSelector(({ users }) => {
    return users;
  });

  const own = true;
  console.log(users);

  for (let user = 0; user < users.length; user++) {
    console.log(users[user].name);
    for (let blog = 0; blog < users[user].blogs.length; blog++) {
      console.log(users[user].blogs[blog].title);
    }
  }

  console.log(
    users.map((user) => {
      user.blogs.map((blog) => {
        return blog.title;
      });
    })
  );

  return (
    <div className="blog">
      {users.map((u) => {
        return (
          <div>
            <h2>{u.name}</h2>
            <h3>added blogs</h3>
          </div>
        );
      })}
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {users.map((user) => {
              return user.blogs.map((blogs) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/blogs/${blogs.id}`}> {blogs.title} </Link>
                    </TableCell>{' '}
                    <TableCell> by {blogs.author} </TableCell>{' '}
                    <TableCell>
                      <Button
                        variant="contained"
                        key={blogs.id}
                        onClick={() => setVisible(!visible)}
                      >
                        {label}{' '}
                      </Button>{' '}
                    </TableCell>{' '}
                    {visible && (
                      <>
                        <div
                          style={{
                            wordBreak: 'break-all',
                          }}
                        >
                          <TableCell>
                            <ReactMarkdown source={blogs.url} />{' '}
                          </TableCell>{' '}
                        </div>{' '}
                        <TableCell>
                          {' '}
                          {blogs.likes}
                          likes{' '}
                        </TableCell>{' '}
                      </>
                    )}{' '}
                  </TableRow>
                );
              });
            })}{' '}
          </TableBody>{' '}
        </Table>{' '}
      </TableContainer>{' '}
    </div>
  );
};

export default Users;
