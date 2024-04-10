import { createSlice } from "@reduxjs/toolkit";

export const miscSlice = createSlice({
  name: "misc",
  initialState: {
    currentService: "",
    news: [],
  },
  reducers: {
    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { setCurrentService, setNews } = miscSlice.actions;

export default miscSlice.reducer;
