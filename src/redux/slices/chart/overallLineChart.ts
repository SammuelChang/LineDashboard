import { createSlice } from "@reduxjs/toolkit";
import { overallLineTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const overallLineChartSlice = createSlice({
  name: "overallLineChart",
  initialState,
  reducers: {
    transformOverallLineChart(state, action) {
      const { dailyLists } = action.payload;
      return overallLineTransformer(dailyLists);
    },
  },
});

const { actions, reducer } = overallLineChartSlice;
export const { transformOverallLineChart } = actions;
export default reducer;
