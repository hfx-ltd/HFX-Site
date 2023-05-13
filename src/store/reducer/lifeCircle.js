import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  themeMode: localStorage.getItem('mode') || 'light',
  notifyEmail: true,
  status: {
    type: '',
    title: '',
    message: '',
  },
};

export const counterSlice = createSlice({
  name: 'lifeCircle',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleReceiveNotification: (state) => {
      state.notifyEmail = !state.notifyEmail;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setLoading, setThemeMode, setStatus, toggleReceiveNotification } = counterSlice.actions;

export default counterSlice.reducer;
