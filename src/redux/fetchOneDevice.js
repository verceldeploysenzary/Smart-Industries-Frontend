import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOneDevice = createAsyncThunk("data/fetchOneDevice", async ( id ) => {
  try {
      const fullUrl = `https://iotlogiq.com:443/api/devices?deviceIds=${id}`;
      const refresh_token = localStorage.getItem("refresh_token");
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${refresh_token}`,
      };
      const response = await axios.get(fullUrl, { headers });
      return response.data 
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const OneDeviceSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle", 
    error: null,
  },
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOneDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOneDevice.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(fetchOneDevice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default OneDeviceSlice;
