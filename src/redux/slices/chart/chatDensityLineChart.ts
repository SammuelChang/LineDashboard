import { createSlice } from "@reduxjs/toolkit";
import { chatDensityLineTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const chatDensityChartSlice = createSlice({
  name: "chatDensityChart",
  initialState,
  reducers: {
    transformChatDensityChart(state, action) {
      const { userLists, userDailyLists } = action.payload;
      return chatDensityLineTransformer(userLists, userDailyLists);
    },
  },
});

const { actions, reducer } = chatDensityChartSlice;
export const { transformChatDensityChart } = actions;
export default reducer;
