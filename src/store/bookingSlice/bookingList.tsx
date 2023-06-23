import { createSlice } from '@reduxjs/toolkit';

export const bookingList = createSlice({
  name: 'bookings',

  initialState: {
    bookingList: [],
  },

  reducers: {
    setBookingList: (state, action) => {
      state.bookingList = action.payload;
    },
  },
});

export const { setBookingList } = bookingList.actions;

export default bookingList.reducer;
