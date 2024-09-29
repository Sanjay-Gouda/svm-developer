import { createSlice } from '@reduxjs/toolkit';

type Ttoken = {
  AUTH_TOKEN: string;
};

export type RootState = {
  token: Ttoken;
};

export const authToken = createSlice({
  name: 'token',

  initialState: {
    AUTH_TOKEN: '',
  },

  reducers: {
    setAuthToken: (state, action) => {
      const payload = action.payload;
      console.log(payload,"TOKEN PAYLOAD");
      state.AUTH_TOKEN = payload;
    },
  },
});

export const { setAuthToken } = authToken.actions;

export default authToken.reducer;
