/* eslint-disable import/prefer-default-export */
import { createSelector } from "reselect"

const selectHome = (state) => state.home

const homeData = (property = "examplesData") =>
  createSelector(selectHome, (homeState) => homeState.get(property))

export { homeData }
