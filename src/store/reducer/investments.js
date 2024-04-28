import { createSlice } from "@reduxjs/toolkit";

export const investmentSlice = createSlice({
  name: "investment",
  initialState: {
    investments: [],
    plans: [],
    activeInvestment: [],
  },
  reducers: {
    setInvestment: (state, action) => {
      state.investments = action.payload;
    },
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
    setActiveInvestment: (state, action) => {
      state.activeInvestment = action.payload;
    },
  },
});

export const { setInvestment, setPlans, setActiveInvestment } = investmentSlice.actions;

export default investmentSlice.reducer;
