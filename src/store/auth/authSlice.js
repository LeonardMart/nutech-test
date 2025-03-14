import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const { setUserInfo, resetAuth } = authSlice.actions;
export default authSlice.reducer;
