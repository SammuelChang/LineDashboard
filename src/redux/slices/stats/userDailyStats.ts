import { createSlice } from "@reduxjs/toolkit";
import { userDailyStatsCalculator } from "../../../utils/analyzer";

const initialState = {
  Lists: [] as IUserDailyStats[],
};

const userDailyStatsSlice = createSlice({
  name: "userDailyStats",
  initialState,
  reducers: {
    analyzeUserDailyStats(state, action) {
      const { content } = action.payload;
      return { ...state, Lists: userDailyStatsCalculator(content) };
    },
    filterUserDailyStats(state, action) {
      const { content, isFullChat, dateRange } = action.payload;
      return {
        ...state,
        Lists: userDailyStatsCalculator(content, isFullChat).filter(
          (i) => i.date >= dateRange.startDate && i.date <= dateRange.endDate
        ),
      };
    },
  },
});

const { actions, reducer } = userDailyStatsSlice;
export const { analyzeUserDailyStats, filterUserDailyStats } = actions;
export default reducer;
