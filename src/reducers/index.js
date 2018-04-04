import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './authReducer';
import chat from './chatReducer';
import users from './usersReducer';

export default combineReducers({
  auth,
  chat,
  users,
  router: routerReducer
});
