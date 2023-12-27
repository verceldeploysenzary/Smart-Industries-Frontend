import { createSlice } from "@reduxjs/toolkit";

const DateGenerateSlice = createSlice({
  name: "dateGenerate",
  initialState: {
    startDateTimestamp: null,
    endDateTimestamp: null,
  },
  reducers: {
    setDateTimestamps: (state, action) => {
      state.startDateTimestamp = action.payload.startDateTimestamp;
      state.endDateTimestamp = action.payload.endDateTimestamp;
    },
  },
});

export const { setDateTimestamps } = DateGenerateSlice.actions;

export default DateGenerateSlice;
