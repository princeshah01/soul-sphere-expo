import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    streamApiKey: null,
    chatToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.streamApiKey = action.payload.streamApiKey;
      state.chatToken = action.payload.chatToken;
    },
    logout: (state) => {
      state.data = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateIsVerified: (state) => {
      state.user.isVerified = true;
    },
    // updateNotIsVerified: (state) => {
    //   state.user.isVerified = false;
    // },
  },
});

export const {
  login,
  logout,
  updateUser,
  updateIsVerified,
  // updateNotIsVerified,
} = AuthSlice.actions;

export default AuthSlice.reducer;
