import { combineReducers } from 'redux';

import auth from './auth';
import todos from './todos';

export default combineReducers({
  auth,
  todos
});
