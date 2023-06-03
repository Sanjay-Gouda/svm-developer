import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accountList: [],
  },
  /* reducer function */
  reducers: {
    setAccountList: (state, action) => {
      state.accountList = action.payload;
    },
  },
});

export const { setAccountList } = accountSlice.actions;

export default accountSlice.reducer;
