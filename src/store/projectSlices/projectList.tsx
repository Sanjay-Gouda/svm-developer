import { createSlice } from '@reduxjs/toolkit';

export const ProjectList = createSlice({
  name: 'projects',
  initialState: {
    projectList: [],
  },
  reducers: {
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { setProjectList } = ProjectList.actions;

export default ProjectList.reducer;
