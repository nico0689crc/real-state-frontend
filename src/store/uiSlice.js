import { createSlice } from "@reduxjs/toolkit";
import { borderRadius } from 'constants/ui';
import LOCALSTORAGE_ITEMS from "constants/localStorageItems";

export const UI_VARIABLES = {
  UI_MODE_DARK: "dark",
  UI_MODE_LIGHT: "light",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mode: UI_VARIABLES.UI_MODE_DARK,
    isOpen: [],
    borderRadius: borderRadius,
    opened: true
  },
  reducers: {
    setMode(state, action) {
      state.mode = action.payload.mode;
    },
    changeModeUi(state, action) {
      const mode = state.mode === UI_VARIABLES.UI_MODE_DARK ? UI_VARIABLES.UI_MODE_LIGHT : UI_VARIABLES.UI_MODE_DARK;
      const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

      state.mode = mode;

      localStorage.setItem(
        LOCALSTORAGE_ITEMS.USER_DATA,
        JSON.stringify({
          ...storedData,
          mode: mode
        })
      );
    },
    toggleSidebar(state, action) {
      state.opened = action.payload.opened;
    },
  },
});

export const uisActions = uiSlice.actions;
