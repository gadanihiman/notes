import { fromJS } from "immutable"
import { v4 as uuidv4 } from 'uuid';
import {
  LOAD_EXAMPLES_DATA,
  LOAD_EXAMPLES_DATA_SUCCESS,
  LOAD_EXAMPLES_DATA_ERROR,
  // NEW_NOTES_PARENT,
  STORE_NOTES,
} from "./constant"

const initialState = fromJS({
  loading: false,
  error: false,
  examplesData: {},
  noteConfig: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    // case NEW_NOTES_PARENT: {
    //   const notes = [ 
    //     {
    //       id: uuidv4(),
    //       notes: [],
    //     },
    //    ];
    //   // return state.set()
    //   return state.set('noteConfig', notes);
    // }

    case STORE_NOTES: {
      const notes = [
        ...state.get('noteConfig'),
        {
          id: uuidv4(),
          notes: action.payload,
        },
      ];
      // const notes = [ ...state.get('noteConfig'), action.payload ];
      // return state.set()
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
