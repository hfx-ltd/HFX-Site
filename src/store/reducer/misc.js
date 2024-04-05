import { createSlice } from "@reduxjs/toolkit";

export const miscSlice = createSlice({
  name: "misc",
  initialState: {
    currentService: "",
  },
  reducers: {
    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    },
  },
});

export const { setCurrentService } = miscSlice.actions;

export default miscSlice.reducer;
