import { createSlice } from "@reduxjs/toolkit";
import { stickerAndEmojiLineTransformer } from "../../../utils/chartDataTransformer";

const initialState = {};

const stickerEmojiChartSlice = createSlice({
  name: "stickerEmojiChart",
  initialState,
  reducers: {
    transformStickerEmojiChart(state, action) {
      const { userLists, userDailyLists } = action.payload;
      return stickerAndEmojiLineTransformer(userLists, userDailyLists);
    },
  },
});

const { actions, reducer } = stickerEmojiChartSlice;
export const { transformStickerEmojiChart } = actions;
export default reducer;
