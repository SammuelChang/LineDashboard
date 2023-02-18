import { createSlice } from "@reduxjs/toolkit";
import { dailyStatsCalculator } from "../../../utils/analyzer";

const initialState = {
  Lists: [] as IDailyStats[],
};

const dailyStatsSlice = createSlice({
  name: "dailyStats",
  initialState,
  reducers: {
    analyzeDailyStats(state, action) {
      const { content } = action.payload;
      return { ...state, Lists: dailyStatsCalculator(content) };
    },
    filterDailyStats(state, action) {
      const { content, isFullChat, dateRange } = action.payload;
      return {
        ...state,
        Lists: dailyStatsCalculator(content, isFullChat).filter(
          (i) => i.date >= dateRange.startDate && i.date <= dateRange.endDate
        ),
      };
    },
  },
});

const { actions, reducer } = dailyStatsSlice;
export const { analyzeDailyStats, filterDailyStats } = actions;
export default reducer;
