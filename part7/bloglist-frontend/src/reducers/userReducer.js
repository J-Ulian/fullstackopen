/* eslint-disable no-case-declarations */
import userService from '../services/login';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      console.log(action.data);
      return action.data;

    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    console.log(users);
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export default userReducer;
