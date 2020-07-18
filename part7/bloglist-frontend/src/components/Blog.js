import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

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
      <Table striped>
        <tbody>
          <tr key={blog.id}>
            <td>
              <i> {blog.title} </i>
            </td>
            <td>by {blog.author} </td>
            <td>
              <Button variant="info" onClick={() => setVisible(!visible)}>
                {label}
              </Button>
            </td>

            {visible && (
              <>
                <td>{blog.url}</td>

                <td>{blog.likes} likes </td>
                <td>
                  <Button variant="success" onClick={() => handleLike(blog.id)}>
                    {' '}
                    like{' '}
                  </Button>
                </td>

                <td>added by {blog.user.name}</td>
                <td>
                  {own && (
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(blog.id)}
                    >
                      remove
                    </Button>
                  )}
                </td>
              </>
            )}
          </tr>
        </tbody>
      </Table>
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
