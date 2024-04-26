import { createSlice } from "@reduxjs/toolkit";

export const investmentSlice = createSlice({
  name: "investment",
  initialState: {
    investments: [],
    plans: [],
  },
  reducers: {
    setInvestment: (state, action) => {
      state.investments = action.payload;
    },
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
  },
});

export const { setInvestment, setPlans } = investmentSlice.actions;

export default investmentSlice.reducer;
