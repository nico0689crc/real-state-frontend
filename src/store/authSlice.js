import { createSlice } from "@reduxjs/toolkit";
import LOCALSTORAGE_ITEMS from "../constants/localStorageItems";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    uid: null,
    client: null,
    attributes: null,
    tokenExpirationDate: null
  },
  reducers: {
    login(state, action) {
      const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

      state.accessToken = action.payload.auth.accessToken;
      state.uid = action.payload.auth.uid;
      state.client = action.payload.auth.client;
      state.attributes = action.payload.auth.attributes;
      state.tokenExpirationDate = action.payload.auth.tokenExpirationDate;

      localStorage.setItem(
        LOCALSTORAGE_ITEMS.USER_DATA,
        JSON.stringify({
          ...storedData,
          accessToken: state.accessToken,
          uid: state.uid,
          client: state.client,
          attributes: state.attributes,
          tokenExpirationDate: action.payload.auth.tokenExpirationDate
        })
      );
    },
    logout(state, action) {
      const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

      state.accessToken = null;
      state.uid = null;
      state.client = null;
      state.attributes = null;
      state.tokenExpirationDate = null;

      localStorage.removeItem(LOCALSTORAGE_ITEMS.USER_DATA);
      localStorage.setItem(
        LOCALSTORAGE_ITEMS.USER_DATA,
        JSON.stringify({
          mode: storedData.mode,
          opened: storedData.opened,
        })
      );
    }
  },
});

export const authActions = authSlice.actions;