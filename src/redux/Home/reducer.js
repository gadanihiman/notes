import { fromJS } from "immutable"
import {
  LOAD_EXAMPLES_DATA,
  LOAD_EXAMPLES_DATA_SUCCESS,
  LOAD_EXAMPLES_DATA_ERROR,
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
    case STORE_NOTES: {
      const notes = [ ...state.get('noteConfig'), action.payload ];
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
