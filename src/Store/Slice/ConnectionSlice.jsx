import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "Connection",
  initialState: {
    data: [],
  },
  reducers: {
    addConnection: (state, action) => {
      state.data = action.payload;
    },
    // updateIsFav:(state , action)=>{
    //     state.data.map()
    // }
  },
});

export const { addConnection } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
