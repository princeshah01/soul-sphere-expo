import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import env from "../../Constant/env";
import axios from "axios";
export const getJoin = createAsyncThunk(
  "getJoin",
  async (token, { rejectWithValue }) => {
    try {
      let response = await axios.get(env.API_BASE_URL + "/join-stream", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of getjoin data ", response.data);
      if (response?.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const ChatSlice = createSlice({
  name: "Chat",
  initialState: {
    isLoading: false,
    isError: false,
    errorMsg: "",
    successMsg: "",
    api_key: "",
    userChatToken: "",
    globalChannelList: [],
    privateChannelList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getJoin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.successMsg = action.payload?.message;
      console.log("<>>>>><<><><<<<<<<<<<<>>>>>>>>>>>>", state.successMsg);
    });
    builder.addCase(getJoin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getJoin.rejected, (state, action) => {
      console.log("error in chat slice", action.payload);
      state.isError = true;
      state.errorMsg = action.payload?.message;
    });
  },
});

export const { update } = ChatSlice.actions;
export default ChatSlice.reducer;
