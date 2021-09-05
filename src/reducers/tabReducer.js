import { TOGGLE_TAB } from '../actions/types.js';

export const tabReducer = (state = 'all', action) => {
  switch (action.type) {
    case TOGGLE_TAB:
      return action.payload;
    default:
      return state;
  }
};
