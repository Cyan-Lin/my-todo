import { CREATE_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actions/types.js';

export const noteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_NOTE:
      const { [action.payload.id]: editedNote } = state;

      const formValues = action.payload.formValues;
      Object.keys(formValues).forEach(
        key => (editedNote[key] = formValues[key])
      );

      return { ...state, [action.payload.id]: editedNote };
    case DELETE_NOTE:
      const { [action.payload]: deletedNote, ...newState } = state;
      return newState;

    default:
      return state;
  }
};
