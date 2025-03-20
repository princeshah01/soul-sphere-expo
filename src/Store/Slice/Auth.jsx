import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
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
