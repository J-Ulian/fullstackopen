import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  comments: commentReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;