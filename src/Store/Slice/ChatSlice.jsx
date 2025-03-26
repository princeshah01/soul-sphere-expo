import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "Chat",
  initialState: {
    isLoading: true,
    isError: false,
    errorMsg: "",
    selectedChannel: null,
    chatClient: null,
  },
  reducers: {
    ErrorOccured: (state, action) => {
      state.isError = true;
      state.errorMsg = action.payload.errorMsg;
    },
    selectChannel: (state, action) => {
      state.selectedChannel = action.payload.selectedChannel;
    },
    clearChat: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.errorMsg = "";
      state.selectedChannel = null;
      state.privateChannelList = [];
    },
    setClient: (state, action) => {
      state.isLoading = false;
      state.chatClient = action.payload.chatClient;
    },
  },
});

export const { clearChat, selectChannel, ErrorOccured, setClient } =
  ChatSlice.actions;
export default ChatSlice.reducer;
