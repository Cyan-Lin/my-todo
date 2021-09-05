import {
  CREATE_NOTE,
  FETCH_ALL_NOTES,
  FETCH_NOTES,
  FETCH_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
} from '../actions/types.js';

export const noteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_ALL_NOTES:
      const newAllObject = {};
      action.payload.forEach(note => (newAllObject[note.id] = note));
      return { ...state, ...newAllObject };

    case FETCH_NOTES:
      const newObject = {};
      action.payload.forEach(note => (newObject[note.id] = note));
      return { ...state, ...newObject };

    // 不可以只return {...state},如果refresh的話所有資料會消失,
    // 所以必須要return payload才行
    case FETCH_NOTE:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_NOTE:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_NOTE:
      const { [action.payload]: deletedNote, ...newState } = state;
      return newState;

    default:
      return state;
  }
};
