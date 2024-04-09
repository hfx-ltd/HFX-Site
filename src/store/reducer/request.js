import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "request",
  initialState: {
    myRequest: null,
    myDeposits: null,
    myWithdraws: null,
  },
  reducers: {
    setRequests: (state, action) => {
      state.myRequest = action.payload;
    },
    setDeposits: (state, action) => {
      state.myDeposits = action.payload;
    },
    setWithdraws: (state, action) => {
      state.myWithdraws = action.payload;
    },
  },
});

export const { setRequests, setDeposits, setWithdraws } = requestSlice.actions;

export default requestSlice.reducer;
