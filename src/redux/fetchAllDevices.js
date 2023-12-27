import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchallDevices = createAsyncThunk("data/fetchallData", async () => {
  try {
    const pageSize = 10;
    let page = 0;
    let allData = [];
    let next =""
    do {    
      const fullUrl = `https://iotlogiq.com:443/api/user/devices?pageSize=${pageSize}&page=${page}`;
      const refresh_token = localStorage.getItem("refresh_token");

      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${refresh_token}`,
      };

      const response = await axios.get(fullUrl, { headers });
      const { data, hasNext } = response.data;
      allData = [...allData, ...data];
      page++;
      next = hasNext
    } while (next);
    return allData;
  } catch (err) {
    console.error(err);
    throw err;
  }
});


const AllDevicesSlice = createSlice({
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
      .addCase(fetchallDevices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchallDevices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchallDevices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AllDevicesSlice;
