import { createSlice } from "@reduxjs/toolkit";
import { messageAndCallLineTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const msgCallChartSlice = createSlice({
  name: "msgCallChart",
  initialState,
  reducers: {
    transformMsgCallChart(state, action) {
      const { userLists, userDailyLists } = action.payload;
      return messageAndCallLineTransformer(userLists, userDailyLists);
    },
  },
});

const { actions, reducer } = msgCallChartSlice;
export const { transformMsgCallChart } = actions;
export default reducer;
