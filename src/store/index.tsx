import { configureStore } from '@reduxjs/toolkit';

import authToken from './authToken/token';
export const store = configureStore({
  reducer: {
    // projectInfo: ProjectDetails,
    // referrals: refferSlice,
    // accounts: accountList,
    // customers: customerList,
    // projects: ProjectList,
    // bookings: bookingList,
    authToken,
  },
});
