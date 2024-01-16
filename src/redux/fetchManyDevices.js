import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchManyDevices = createAsyncThunk("data/fetchManyDevices", async ( id ) => {
  try {
      const fullUrl = `https://iotlogiq.com:443/api/devices?deviceIds=${id}`;
      const refresh_token = localStorage.getItem("refresh_token");
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${refresh_token}`,
      };
      const response = await axios.get(fullUrl, { headers });
      console.log(response.data[0]);
      return response.data 
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const ManyDevicesSlice = createSlice({
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
      .addCase(fetchManyDevices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchManyDevices.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newPayload = action.payload[0];
        const isLabelExist = state.data.some((item) => item.label === newPayload.label);
        if (!isLabelExist) {
          state.data = [...state.data, newPayload];
        } else {
          console.log(`Label "${newPayload.label}" already exists, skipping addition.`);
        }
      })
      .addCase(fetchManyDevices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ManyDevicesSlice;
