import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slicers/data";
import contractsSlice from "./slicers/contract";
export const store = configureStore({
  reducer: {
    data: dataSlice,
    contracts: contractsSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
