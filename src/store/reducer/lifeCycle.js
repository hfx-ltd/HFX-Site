import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  themeMode: localStorage.getItem('mode') || 'light',
  notifyEmail: true,
  status: {
    type: '',
    title: '',
    message: '',
  },
  showTelegram: false,
};

export const counterSlice = createSlice({
  name: 'lifeCycle',
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
    setShowTelegram: (state, action) => {
      state.showTelegram = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setLoading, setThemeMode, setStatus, toggleReceiveNotification, setShowTelegram } = counterSlice.actions;

export default counterSlice.reducer;
