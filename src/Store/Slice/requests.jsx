import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    data: [],
  },
  reducers: {
    addRequests: (state, action) => {
      state.data = action.payload;
    },
    removeRequest: (state, action) => {
      state.data = state.data.filter((req) => req._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
