import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchWidget3 = createAsyncThunk(
  "data/fetchWidget3",
  async (id) => {
    try {
      const fullUrl = `
      https://iotlogiq.com:443/api/plugins/telemetry/DEVICE/${id}/values/timeseries`;
      const refresh_token = localStorage.getItem("refresh_token");
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${refresh_token}`,
      };
      const response = await axios.get(fullUrl, { headers });
      return { responseData: response.data };
    } catch (err) {
      console.error("Error in fetchWidget3:", err);
      throw err;
    }
  }
);

const Widget3Slice = createSlice({
  name: "data",
  initialState: {
    responseData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidget3.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWidget3.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.responseData = action.payload.responseData;
        }
      })
      .addCase(fetchWidget3.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default Widget3Slice;
