import { createSlice } from "@reduxjs/toolkit";
import { summaryBlocksTransformer } from "../../../utils/chartDataTransformer";

const initialState = { Lists: [] as any[] };

const summaryBlocksSlice = createSlice({
  name: "summaryBlocks",
  initialState,
  reducers: {
    transformSummaryBlocks(state, action) {
      const { summaryStats } = action.payload;
      return { ...state, Lists: summaryBlocksTransformer(summaryStats) };
    },
  },
});

const { actions, reducer } = summaryBlocksSlice;
export const { transformSummaryBlocks } = actions;
export default reducer;
