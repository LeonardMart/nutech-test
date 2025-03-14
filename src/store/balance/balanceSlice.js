import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: { amount: 0 },
  reducers: {
    setBalance: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
