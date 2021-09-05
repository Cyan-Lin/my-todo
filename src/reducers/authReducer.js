import { SIGN_IN, SIGN_OUT } from '../actions/types.js';

const INITIAL_STATE = {
  // we initially do not know if user is signed in
  isSignedIn: null,
  userId: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
