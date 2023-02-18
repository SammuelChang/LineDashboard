import { createSlice } from "@reduxjs/toolkit";
import { mediaPowerLineTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const mediaPowerChartSlice = createSlice({
  name: "mediaPowerChart",
  initialState,
  reducers: {
    transformMediaPowerChart(state, action) {
      const { userLists, userDailyLists } = action.payload;
      return mediaPowerLineTransformer(userLists, userDailyLists);
    },
  },
});

const { actions, reducer } = mediaPowerChartSlice;
export const { transformMediaPowerChart } = actions;
export default reducer;
