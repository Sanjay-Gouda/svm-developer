import ProjectDetails from '@/store/projectSlices/projectDetail';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    projectInfo: ProjectDetails,
  },
});
