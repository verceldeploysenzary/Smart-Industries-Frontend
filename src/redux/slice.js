import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
    
  try {
    const fullUrl = "https://iotlogiq.com:443/api/dashboards?dashboardIds=ac83c280-45d9-11ee-a7fd-0bb7ff8d9eaa";
    const refresh_token = localStorage.getItem("refresh_token");

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${refresh_token}`,
    };

    const response = await axios.get(fullUrl, { headers });

    // delete
    console.log(response.data[0].name);
    console.log(response.data[0].groups);
    //delete

    return response.data[0];


  } catch (err) {
    console.error(err);
    throw err;
  }
});

const AdminDashboardSlice = createSlice({
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
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AdminDashboardSlice;
