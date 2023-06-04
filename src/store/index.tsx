import { configureStore } from '@reduxjs/toolkit';

import accountList from '@/store/accountSlice/accountList';
import customerList from '@/store/customerSlice/customerList';
import ProjectDetails from '@/store/projectSlices/projectDetail';
import refferSlice from '@/store/refferSlice/refferList';

export const store = configureStore({
  reducer: {
    projectInfo: ProjectDetails,
    referrals: refferSlice,
    accounts: accountList,
    customers: customerList,
  },
});
