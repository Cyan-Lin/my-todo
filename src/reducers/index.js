import { combineReducers } from 'redux';

import { noteReducer } from './noteReducer.js';
import { tabReducer } from './tabReducer.js';
import { authReducer } from './authReducer.js';

export default combineReducers({
  notes: noteReducer,
  tab: tabReducer,
  auth: authReducer,
});
