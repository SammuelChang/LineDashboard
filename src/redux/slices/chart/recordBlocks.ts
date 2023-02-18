import { createSlice } from "@reduxjs/toolkit";
import { recordTransformer } from "../../../utils/chartDataTransformer";

const initialState = { Lists: [] as any[] };

const recordBlocksSlice = createSlice({
  name: "recordBlocks",
  initialState,
  reducers: {
    transformRecordBlocks(state, action) {
      const { maxStats } = action.payload;
      return { ...state, Lists: recordTransformer(maxStats) };
    },
  },
});

const { actions, reducer } = recordBlocksSlice;
export const { transformRecordBlocks } = actions;
export default reducer;
