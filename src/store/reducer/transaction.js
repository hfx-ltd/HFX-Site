import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    myTransaction: null,
    myDepositsTransaction: null,
    myWithdrawsTransaction: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.myTransaction = action.payload;
    },
    setDepositTransactions: (state, action) => {
      state.myDepositsTransaction = action.payload;
    },
    setWithdrawTransaction: (state, action) => {
      state.myWithdrawsTransaction = action.payload;
    },
  },
});

export const { setTransactions, setDepositTransactions, setWithdrawTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
