import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const isFullChatSlice = createSlice({
  name: "isFullChat",
  initialState,
  reducers: {
    parseFile(state, action) {
      return !state;
    },
  },
});

export const { actions, reducer } = isFullChatSlice;
export default reducer;
