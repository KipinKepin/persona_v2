import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../features/customersSlice";

export const store = configureStore({
  reducer: {
    customers: customersReducer,
  },
});
