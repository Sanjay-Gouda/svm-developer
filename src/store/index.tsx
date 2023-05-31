import { configureStore } from '@reduxjs/toolkit';

import ProjectDetails from '@/store/projectSlices/projectDetail';
import refferSlice from '@/store/refferSlice/refferList';

export const store = configureStore({
  reducer: {
    projectInfo: ProjectDetails,
    // referrals: Referrals,
    referrals: refferSlice,
  },
});
