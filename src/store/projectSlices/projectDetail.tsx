import { createSlice } from '@reduxjs/toolkit';

import { TDetailValues } from '@/components/Projects/projectDetailType';

const DetailValues: TDetailValues = {
  name: '',
  ownerName: '',
  parentProject: '',
  area: undefined,
  pincode: undefined,
  unit: 'meter',
  state: '',
  dist: '',
  description: '',
  status: '',
  address1: undefined,
};

const initialState: any = {
  ...DetailValues,
  planningImages: [],
  siteImages: [],
  planningImageFormData: [],
  siteImageFromData: [],
};

const ProjectDetails = createSlice({
  name: 'projectDetail',
  initialState,

  reducers: {
    setProjectinfo: (state, action) => {
      const projectDetails = action.payload;
      return {
        ...state,
        ...projectDetails,
      };
    },

    setPlanningImages: (state, action) => {
      const imageFiles = action.payload;

      let ID = 1000;
      const FileArray = [...imageFiles].map((file) => {
        const { name, size } = file;

        const fileobj = { name, size, imageId: ID };
        ID++;

        return fileobj;
      });

      return {
        ...state,
        planningImages: [...state.planningImages, ...FileArray],
        planningImageFormData: imageFiles,
      };
    },
    setSiteImages: (state, action) => {
      const imageFiles = action.payload;

      let ID = 1000;
      const FileArray = [...imageFiles].map((file) => {
        const { name, size } = file;

        const fileobj = { name, size, imageId: ID };
        ID++;

        return fileobj;
      });

      return {
        ...state,
        siteImages: [...state.siteImages, ...FileArray],
        siteImageFromData: [imageFiles],
      };
    },

    clearPlanningImage: (state) => {
      state.planningImages = [];
    },
    clearSiteImage: (state) => {
      state.siteImages = [];
    },
  },
});

export const {
  setProjectinfo,
  setPlanningImages,
  setSiteImages,
  clearPlanningImage,
  clearSiteImage,
} = ProjectDetails.actions;

export default ProjectDetails.reducer;
