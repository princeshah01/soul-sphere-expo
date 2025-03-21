import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import env from "../../Constant/env";
import axios from "axios";
export const getChatList = createAsyncThunk("getChatList", async (token) => {
  let response = await axios.get(env.API_BASE_URL + "/chat-list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const ChatSlice = createSlice({
  name: "Chat",
  initialState: {
    isError: false,
    isLoading: true,
    ChatList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getChatList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.ChatList = action.payload?.data;
    });
    builder.addCase(getChatList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChatList.rejected, (state, action) => {
      console.log("error in chat slice", action.payload);
      state.isError = true;
    });
  },
});

export const { update } = ChatSlice.actions;
export default ChatSlice.reducer;
