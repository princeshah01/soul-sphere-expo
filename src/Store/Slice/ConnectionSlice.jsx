import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "../../Constant/env";

export const getConnections = createAsyncThunk(
  "getConnections",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(env.API_BASE_URL + "/user/connections", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch connections",
        }
      );
    }
  }
);

const ConnectionSlice = createSlice({
  name: "Connection",
  initialState: {
    isError: false,
    isLoading: true,
    data: [{ name: "prince" }],
    errorMsg: null,
  },
  reducers: {
    addConnection: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnections.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMsg = null;
      })
      .addCase(getConnections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getConnections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        state.errorMsg = action.payload?.message;
      });
  },
});

export const { addConnection } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
