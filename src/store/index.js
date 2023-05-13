import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/auth';
import lifeCircleReducer from './reducer/lifeCircle';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lifeCircle: lifeCircleReducer,
  },
});
