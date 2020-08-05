import { LOAD_EXAMPLES_DATA, LOAD_EXAMPLES_DATA_SUCCESS, STORE_NOTES } from "./constant"

export const storeNotes = payload => ({
  type: STORE_NOTES,
  payload,
})

export const getExamplesData = () => ({
  type: LOAD_EXAMPLES_DATA,
})

export const getExampleLoaded = (data) => ({
  type: LOAD_EXAMPLES_DATA_SUCCESS,
  examplesData: data,
})
