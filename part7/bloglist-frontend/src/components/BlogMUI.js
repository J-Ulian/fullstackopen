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
import { likeIt, removeIt } from '../reducers/blogReducer';

const Blog = ({ handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const label = visible ? 'hide' : 'view';

  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => {
    console.log(blogs);
    return blogs;
  });
  console.log(blogs);
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const own = true;

  return (
    <div /*style={blogStyle}*/ className="blog">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort(byLikes).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <i> {blog.title} </i>
                </TableCell>
                <TableCell> by {blog.author} </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    key={blog.id}
                    onClick={() => setVisible(!visible)}
                  >
                    {label}
                  </Button>
                </TableCell>
                {visible && (
                  <>
                    <div
                      style={{
                        wordBreak: 'break-all',
                      }}
                    >
                      <TableCell>
                        <ReactMarkdown source={blog.url} />
                      </TableCell>
                    </div>
                    <TableCell> {blog.likes} likes </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => dispatch(likeIt(blog.id))}
                      >
                        like
                      </Button>
                    </TableCell>
                    <TableCell> added by {blog.user.name} </TableCell>
                    <TableCell>
                      {own && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => dispatch(removeIt(blog.id))}
                        >
                          remove
                        </Button>
                      )}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;
