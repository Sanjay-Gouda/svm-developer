import { createSlice } from '@reduxjs/toolkit';

// const intialState = [];

const refferSlice = createSlice({
  name: 'reffer',
  initialState: {
    list: [],
  },
  reducers: {
    setReferralList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setReferralList } = refferSlice.actions;

export default refferSlice.reducer;
