import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchWidget1 = createAsyncThunk(
  "data/fetchWidget1",
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
      console.log(response.data);
      return { responseData: response.data }; // Store only the response data
    } catch (err) {
      console.error("Error in fetchWidget1:", err);
      throw err;
    }
  }
);

const Widget1Slice = createSlice({
  name: "data",
  initialState: {
    responseData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidget1.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWidget1.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.responseData = action.payload.responseData;
        }
      })
      .addCase(fetchWidget1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default Widget1Slice;
