import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchDevicesNandina = createAsyncThunk(
  "data/fetchDevicesNandina",
  async (_, { rejectWithValue }) => {
    try {
      const pageSize = 10;
      let page = 0;
      let allData = [];
      let next = "";
      do {
        const fullUrl = `https://iotlogiq.com:443/api/entityGroup/4a6a3560-74d3-11ee-a2ed-6fdb8aa7c38e/entities?pageSize=100&page=${page}`;
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
        next = hasNext;
      } while (next);

      const processedData = await Promise.all(
        allData.map(async (item) => {
          const { id } = item.id;
          const fullUrl = `https://iotlogiq.com:443/api/plugins/telemetry/DEVICE/${id}/keys/timeseries`;
          const refresh_token = localStorage.getItem("refresh_token");
          const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-Authorization": `Bearer ${refresh_token}`,
          };

          const startDateTimestamp = 1649700436177;
          const endDateTimestamp = 1749706436177;

          if (
            typeof startDateTimestamp !== "number" ||
            typeof endDateTimestamp !== "number"
          ) {
            console.error(
              "Invalid timestamps! Both startDateTimestamp and endDateTimestamp must be numbers."
            );
            return;
          }

          try {
            const response = await axios.get(fullUrl, { headers });
            const keys = response.data;
            if (!keys.length) {
              console.warn("No keys found! Unable to fetch device attributes.");
              return "";
            }
            const encodedKeys = keys.map(encodeURIComponent).join("%2C");

            const secondUrl = `https://iotlogiq.com:443/api/plugins/telemetry/DEVICE/${id}/values/timeseries?keys=${encodedKeys}&startTs=${startDateTimestamp}&endTs=${endDateTimestamp}`;
           
            /* const arrageData = [];
            const properties = [];
            let propertyNamesSet = new Set();

            let processedPropertiesCount = 0;
            for (const property in secondResponse.data) {
              if (
                Object.prototype.hasOwnProperty.call(
                  secondResponse.data,
                  property
                )
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
            
                // Increment the count and break the loop if reached 5 properties
                processedPropertiesCount++;
                if (processedPropertiesCount >= 1) {
                  break;
                }
              }
            } */

              // arrageData

              const secondResponse = await axios.get(secondUrl, { headers });

              let unArrageDatas = {};
              
              if (Object.keys(secondResponse.data).length > 0) {
                for (const property in secondResponse.data) {
                  if (
                    Object.prototype.hasOwnProperty.call(
                      secondResponse.data,
                      property
                    )
                  ) {
                    const filteredArray = secondResponse.data[property].slice(0, 25);
                    unArrageDatas[property] = filteredArray;
                  }
                }
              }
            let unArrageData = secondResponse.data;
            return { id, unArrageData, unArrageDatas, allData };
          } catch (secondErr) {
            console.error("Error in second URL call:", secondErr);
            throw secondErr;
          }
        })
      );
      return processedData;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

const NandinaDeviceSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevicesNandina.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDevicesNandina.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDevicesNandina.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default NandinaDeviceSlice;
