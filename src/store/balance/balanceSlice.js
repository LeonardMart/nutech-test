import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};


export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.amount = action.payload;
    },
    resetBalance: () => initialState,
  },
});

export const { setBalance, resetBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
