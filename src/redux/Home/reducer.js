import { fromJS } from "immutable"
import { v4 as uuidv4 } from 'uuid';
import {
  LOAD_EXAMPLES_DATA,
  LOAD_EXAMPLES_DATA_SUCCESS,
  LOAD_EXAMPLES_DATA_ERROR,
  STORE_NOTES,
  SAVE_NOTES,
} from "./constant"

const initialState = fromJS({
  loading: false,
  error: false,
  examplesData: {},
  noteConfig: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NOTES: {
      const noteID = action.payload.id;
      const newNotes = action.payload.notes;
      const currentNotes = state.get('noteConfig');
      const removeSelectedNote = currentNotes.filter((note => note.id !== noteID));
      const updatedNotes = [ ...removeSelectedNote, { id: noteID, notes: newNotes } ];
      return state.set('noteConfig', updatedNotes);
    }

    case STORE_NOTES: {
      const notes = [
        ...state.get('noteConfig'),
        {
          id: uuidv4(),
          notes: action.payload,
        },
      ];
      return state.set('noteConfig', notes);
    }

    case LOAD_EXAMPLES_DATA:
      return state.set("loading", true)

    case LOAD_EXAMPLES_DATA_SUCCESS:
      return state
        .set("loading", false)
        .set("examplesData", fromJS(action.examplesData))

    case LOAD_EXAMPLES_DATA_ERROR:
      return state.set("loading", false).set("error", action.error)

    default:
      return state
  }
}
