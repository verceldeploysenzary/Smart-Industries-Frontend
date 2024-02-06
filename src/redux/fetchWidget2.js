import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchWidget2 = createAsyncThunk(
  "data/fetchWidget2",
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
      console.error("Error in fetchWidget2:", err);
      throw err;
    }
  }
);

const Widget2Slice = createSlice({
  name: "data",
  initialState: {
    responseData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidget2.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWidget2.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.responseData = action.payload.responseData;
        }
      })
      .addCase(fetchWidget2.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default Widget2Slice;
