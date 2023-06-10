import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Lists: [] as IMessage[],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      const { content } = action.payload;
      return content.messages;
    },
    filterMessages(state, action) {
      const { content, dateRange } = action.payload;
      return {
        ...state,
        Lists: content.messages.filter(
          (i: IMessage) =>
            i.date >= dateRange.startDate && i.date <= dateRange.endDate
        ),
      };
    },
  },
});

const { actions, reducer } = messagesSlice;
export const { setMessages, filterMessages } = actions;
export default reducer;
