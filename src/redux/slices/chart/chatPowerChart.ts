import { createSlice } from "@reduxjs/toolkit";
import { chatPowerLineTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const chatPowerChartSlice = createSlice({
  name: "chatPowerChart",
  initialState,
  reducers: {
    transformChatPowerChart(state, action) {
      const { userLists, userDailyLists } = action.payload;
      return chatPowerLineTransformer(userLists, userDailyLists);
    },
  },
});

const { actions, reducer } = chatPowerChartSlice;
export const { transformChatPowerChart } = actions;
export default reducer;
