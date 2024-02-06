import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchAbeewayWidget = createAsyncThunk(
  "data/fetchaEntityGroup",
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
      return { responseData: response.data };
    } catch (err) {
      console.error("Error in fetchAbeewayWidget:", err);
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
      .addCase(fetchAbeewayWidget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAbeewayWidget.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.responseData = action.payload.responseData;
        }
      })
      .addCase(fetchAbeewayWidget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default Widget1Slice;
