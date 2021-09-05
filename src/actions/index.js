import notes from '../apis/notes.js';
import {
  CREATE_NOTE,
  FETCH_ALL_NOTES,
  FETCH_NOTES,
  FETCH_NOTE,
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

export const createNote = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await notes.post('/notes', { ...formValues, userId });

  dispatch({ type: CREATE_NOTE, payload: response.data });
};

// 目前用不到 一次拿全部不切實際
export const fetchAllNotes = () => async dispatch => {
  const response = await notes.get('/notes');
  dispatch({ type: FETCH_ALL_NOTES, payload: response.data });
};

// 應該從使用者ID去找才對
export const fetchNotes = params => async dispatch => {
  const response = await notes.get('/notes', { params });
  dispatch({ type: FETCH_NOTES, payload: response.data });
};

// 目前用不到 因為沒有ROUTER切換, 所以從全部裡面拿就好
export const fetchNote = id => async dispatch => {
  const response = await notes.get(`notes/${id}`);
  dispatch({ type: FETCH_NOTE, payload: response.data });
};

export const editNote = (id, formValues) => async dispatch => {
  const response = await notes.patch(`notes/${id}`, formValues);
  dispatch({ type: EDIT_NOTE, payload: response.data });
};

export const deleteNote = id => async dispatch => {
  await notes.delete(`notes/${id}`);
  dispatch({ type: DELETE_NOTE, payload: id });
};

export const toggleTab = tab => {
  return {
    type: TOGGLE_TAB,
    payload: tab,
  };
};
