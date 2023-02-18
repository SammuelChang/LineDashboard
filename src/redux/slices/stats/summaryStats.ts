import { createSlice } from "@reduxjs/toolkit";
import { summaryStatsCalculator } from "../../../utils/analyzer";

const initialState = {};

const summaryStatsSlice = createSlice({
  name: "summaryStats",
  initialState,
  reducers: {
    analyzeSummaryStats(state, action) {
      const { content, dailyLists } = action.payload;
      return summaryStatsCalculator(content, dailyLists);
    },
  },
});

const { actions, reducer } = summaryStatsSlice;
export const { analyzeSummaryStats } = actions;
export default reducer;
