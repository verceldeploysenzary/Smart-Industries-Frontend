import { createSlice } from "@reduxjs/toolkit";

const IdStateSlice = createSlice({
  name: "IdStateSlice",
  initialState: {
    idState: null,
  },
  reducers: {
    setIdState: (state, action) => {
      state.idState = action.payload; 
    },
  },
});

export const { setIdState } = IdStateSlice.actions;

export default IdStateSlice;
