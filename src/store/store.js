import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import balanceReducer from "./balance/balanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
  },
});

export default store;
