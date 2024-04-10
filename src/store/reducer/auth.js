import { createSlice } from '@reduxjs/toolkit';
import APIService from '../../service';

const initialState = {
  isAuth: false,
  profile: null,
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile[action.payload.key] = action.payload.value;
    },
    logOut: (state) => {
      APIService.update('/auth', 'logout')
        .finally(() => {
          console.log('loggedOut');
        })
        .catch((err) => console.log('LogOut Error >> ', err?.message));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('loggedIn')
      state.isAuth = false;
      state.profile = null;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setAuth, setProfile, updateProfile, logOut } = counterSlice.actions;

export default counterSlice.reducer;
