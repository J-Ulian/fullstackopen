import blogService from '../services/blogs';

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS':
      console.log(action.data);
      return action.data;

    case 'NEW_COMMENT':
      return [...state, action.data];

    default:
      return state;
  }
};

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getAllComments(id);
    console.log(comments);
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    });
  };
};

export const createComment = (content) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(content);
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    });
  };
};

export default commentReducer;
