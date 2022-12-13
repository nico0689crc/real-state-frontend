import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { authSlice } from "./authSlice";
import { snackBarAlertSlice } from "./snackBarAlertSlice";
import { propertiesSlice } from "./properties/propertiesSlice";
import { realEstatesSlice } from "./real_estates/realEstateSlice";
import { usersSlice } from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    uiStore: uiSlice.reducer,
    authStore: authSlice.reducer,
    snackBarAlertStore: snackBarAlertSlice.reducer,
    propertiesStore: propertiesSlice.reducer,
    realEstatesStore: realEstatesSlice.reducer,
    usersStore: usersSlice.reducer,
  },
});