import { createSlice } from "@reduxjs/toolkit";
import { recordCalculator } from "../../../utils/analyzer";

const initialState = {};

const maxStatsSlice = createSlice({
  name: "recordStats",
  initialState,
  reducers: {
    analyzeRecordStats(state, action) {
      const { content, dailyLists } = action.payload;
      return recordCalculator(content, dailyLists);
    },
  },
});

const { actions, reducer } = maxStatsSlice;
export const { analyzeRecordStats } = actions;
export default reducer;
