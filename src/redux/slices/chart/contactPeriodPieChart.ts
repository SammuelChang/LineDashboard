import { createSlice } from "@reduxjs/toolkit";
import { contactPeriodPieTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const contactPeriodPieChartSlice = createSlice({
  name: "contactPeriodPieChart",
  initialState,
  reducers: {
    transformContactPeriodPieChart(state, action) {
      const { summaryStats } = action.payload;
      return contactPeriodPieTransformer(summaryStats);
    },
  },
});

const { actions, reducer } = contactPeriodPieChartSlice;
export const { transformContactPeriodPieChart } = actions;
export default reducer;
