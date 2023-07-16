import { createSlice } from "@reduxjs/toolkit";
import { messageRatioTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const messageRatioPieChartSlice = createSlice({
  name: "messageRatioPieChart",
  initialState,
  reducers: {
    transformMessageRatioPieChart(state, action) {
      const { summaryStats } = action.payload;
      return messageRatioTransformer(summaryStats);
    },
  },
});

const { actions, reducer } = messageRatioPieChartSlice;
export const { transformMessageRatioPieChart } = actions;
export default reducer;
