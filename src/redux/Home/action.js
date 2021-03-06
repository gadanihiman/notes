import {
  LOAD_EXAMPLES_DATA,
  LOAD_EXAMPLES_DATA_SUCCESS,
  STORE_NOTES,
  SAVE_NOTES,
  REMOVE_NOTE,
} from "./constant"

export const storeNotes = payload => ({
  type: STORE_NOTES,
  payload,
})

export const saveNotes = payload => ({
  type: SAVE_NOTES,
  payload,
})

export const removeNote = payload => ({
  type: REMOVE_NOTE,
  payload,
})

export const getExamplesData = () => ({
  type: LOAD_EXAMPLES_DATA,
})

export const getExampleLoaded = (data) => ({
  type: LOAD_EXAMPLES_DATA_SUCCESS,
  examplesData: data,
})
