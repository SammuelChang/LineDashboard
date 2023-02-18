import { createSlice } from "@reduxjs/toolkit";
import { chatProcessor } from "../../utils/chatParser";

const initialState = {} as any;

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    parseFile(state, action) {
      return chatProcessor(action.payload);
    },
  },
});

const { actions, reducer } = contentSlice;
export const { parseFile } = actions;
export default reducer;
