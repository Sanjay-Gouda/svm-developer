import { configureStore } from '@reduxjs/toolkit';

import authToken from './authToken/token';
export const store = configureStore({
  reducer: {
    authToken,
  },
});
