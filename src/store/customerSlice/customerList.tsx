import { createSlice } from '@reduxjs/toolkit';

export const customerList = createSlice({
  name: 'customers',
  initialState: {
    customerList: [],
  },
  reducers: {
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
  },
});

export const { setCustomerList } = customerList.actions;

export default customerList.reducer;
