import { createSlice } from "@reduxjs/toolkit";

export const snackBarAlertSlice = createSlice({
  name: "snackBarAlert",
  initialState: {
    isSnackBarOpen: false,
    snackBarAlert: {
      type: null,
      content: {
        title: null,
        subTitle: null,
        message: null
      }
    }
  },
  reducers: {
    setSnackBarAlert(state, action) {
      state.snackBarAlert = action.payload;
      state.isSnackBarOpen = true;
    },
    closeSnackBarAlert(state, action) {
      state.isSnackBarOpen = false;
    }
  },
});

export const snackBarAlertActions = snackBarAlertSlice.actions;
