import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    uiStore: uiSlice.reducer,
    authStore: authSlice.reducer
  },
});