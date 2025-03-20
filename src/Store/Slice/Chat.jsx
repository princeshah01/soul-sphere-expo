import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "Chat",
  initialState: {
    data: {
      name: "prince",
    },
  },
  reducers: {
    update: (state, action) => {
      state.user = action.payload.user;
    },
    // logout: (state) => {
    //   state.data = null;
    //   state.token = null;
    //   state.isAuthenticated = false;
    // },
    // updateUser: (state, action) => {
    //   state.user = action.payload;
    // },
    // updateIsVerified: (state) => {
    //   state.user.isVerified = true;
    // },
  },
});

export const { update } = ChatSlice.actions;
export default ChatSlice.reducer;
