import { createSlice } from "@reduxjs/toolkit";

const initialState = {} as any;

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    uploadFile(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = fileSlice;
export const { uploadFile } = actions;
export default reducer;
