import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchaEntityGroup = createAsyncThunk("data/fetchaEntityGroup", async () => {
  try {
    const pageSize = 1;
    let page = 0;
    let allData = [];
    let next =""
    do {
      const fullUrl = `https://iotlogiq.com:443/api/entityGroup/d0b4b3c0-8e2d-11ee-a2ed-6fdb8aa7c38e/devices?pageSize=${pageSize}&page=${page}`;
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
    console.log(allData);
    return allData;
  } catch (err) {
    console.error(err);
    throw err;
  }
});


const EntityGroupSlice = createSlice({
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
      .addCase(fetchalldashboards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchalldashboards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchalldashboards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default EntityGroupSlice;
