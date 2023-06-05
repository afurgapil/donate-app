import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  donate: null,
};

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setDonateContract: (state, action) => {
      state.donate = action.payload;
    },
  },
});

export const { setDonateContract } = contractsSlice.actions;

export default contractsSlice.reducer;
