import _ from 'lodash';

import {
  CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  TOGGLE_TAB,
  SIGN_IN,
  SIGN_OUT,
} from './types.js';

// export const createNote = note => {
//   return {
//     type: CREATE_NOTE,
//     payload: note,
//   };
// };

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createNote = formValues => (dispatch, getState) => {
  const { userId } = getState().auth;

  dispatch({
    type: CREATE_NOTE,
    payload: { ...formValues, userId, id: _.uniqueId() },
  });
};

export const editNote = (id, formValues) => {
  return {
    type: EDIT_NOTE,
    payload: { id, formValues },
  };
};

export const deleteNote = id => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

export const toggleTab = tab => {
  return {
    type: TOGGLE_TAB,
    payload: tab,
  };
};
