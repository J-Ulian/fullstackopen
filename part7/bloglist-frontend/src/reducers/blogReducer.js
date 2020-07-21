/* eslint-disable no-case-declarations */
import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      console.log(action.data);
      return action.data;

    case 'DELETE_IT':
      const id2 = action.data.id;
      const blogToRemove = state.find((n) => n.id === id2);
      const handleRemove = async (id2) => {
        await blogService.remove(id2);
      };
      handleRemove();

      return state.filter((b) => b.id !== id2);

    case 'LIKE_IT':
      const id = action.data.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
        user: blogToChange.user.id,
      };
      const handleLike = async (id) => {
        await blogService.update(changedBlog);
      };
      handleLike();
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));

    default:
      return state;
  }
};
// const handleLike = async (id) => {
//  // const blogToLike = blogs.find((b) => b.id === id);
//   const likedBlog = {
//     ...blogToLike,
//     likes: blogToLike.likes + 1,
//     user: blogToLike.user.id,
//   };
//   await blogService.update(likedBlog);
//   setBlogs(
//     blogs.map((b) =>
//       b.id === id
//         ? {
//             ...blogToLike,
//             likes: blogToLike.likes + 1,
//           }
//         : b
//     )
//   );
// };

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const likeIt = (id) => {
  return {
    type: 'LIKE_IT',
    data: {
      id,
    },
  };
};

export const removeIt = (id) => {
  return {
    type: 'DELETE_IT',
    data: { id },
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs);
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export default blogReducer;
