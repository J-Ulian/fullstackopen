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

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const label = visible ? 'hide' : 'view';

  return (
    <div /*style={blogStyle}*/ className="blog">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow key={blog.id}>
              <TableCell>
                <i> {blog.title} </i>
              </TableCell>
              <TableCell>by {blog.author} </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => setVisible(!visible)}
                >
                  {label}
                </Button>
              </TableCell>

              {visible && (
                <>
                  <TableCell>{blog.url}</TableCell>

                  <TableCell>{blog.likes} likes </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleLike(blog.id)}
                    >
                      {' '}
                      like{' '}
                    </Button>
                  </TableCell>

                  <TableCell>added by {blog.user.name}</TableCell>
                  <TableCell>
                    {own && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRemove(blog.id)}
                      >
                        remove
                      </Button>
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired,
};

export default Blog;
