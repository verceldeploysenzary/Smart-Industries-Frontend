import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchDeviceAtributes = createAsyncThunk(
  "data/fetchaEntityGroup",
  async ({ id, startDateTimestamp, endDateTimestamp }) => {
    try {
      const fullUrl = `https://iotlogiq.com:443/api/plugins/telemetry/DEVICE/${id}/keys/timeseries`;
      const refresh_token = localStorage.getItem("refresh_token");
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${refresh_token}`,
      };

      if (
        typeof startDateTimestamp !== "number" ||
        typeof endDateTimestamp !== "number"
      ) {
        console.error(
          "Invalid timestamps! Both startDateTimestamp and endDateTimestamp must be numbers."
        );
        return;
      }

      const response = await axios.get(fullUrl, { headers });
      const keys = response.data;
      if (!keys.length) {
        console.warn("No keys found! Unable to fetch device attributes.");
        return "";
      }
      const encodedKeys = keys.map(encodeURIComponent).join("%2C");

      const secondUrl = `https://iotlogiq.com:443/api/plugins/telemetry/DEVICE/${id}/values/timeseries?keys=${encodedKeys}&startTs=${startDateTimestamp}&endTs=${endDateTimestamp}`;

      try {
        const secondResponse = await axios.get(secondUrl, { headers });
        const arrageData = [];
        const properties = [];
        let propertyNamesSet = new Set();

        for (const property in secondResponse.data) {
          if (
            Object.prototype.hasOwnProperty.call(secondResponse.data, property)
          ) {
            properties[property] = [];
            secondResponse.data[property].forEach((obj) => {
              if ("ts" in obj) {
                if (!arrageData[obj.ts]) {
                  arrageData[obj.ts] = [];
                  propertyNamesSet.add(property);
                }
                arrageData[obj.ts].push({ [property]: obj.value });
                properties[property] = [{ [property]: obj.value }];
              }
            });
          }
        }

        console.log(secondResponse.data);
        let unArrageData = secondResponse.data
         return {arrageData, unArrageData};
      } catch (secondErr) {
        console.error("Error in second URL call:", secondErr);
        throw secondErr;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

const DeviceAtributesSlice = createSlice({
  name: "data",
  initialState: {
    arrageData: [], 
    secondResponse: [], 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceAtributes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeviceAtributes.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.arrageData = action.payload.arrageData || [];
          state.secondResponse = action.payload.unArrageData || [];
        }
      })
      .addCase(fetchDeviceAtributes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default DeviceAtributesSlice;

