import { authActions } from './authSlice';
import { uisActions } from './uiSlice';
import LOCALSTORAGE_ITEMS from "../constants/localStorageItems";

export const retrievUserDataActionCreator = () => {
  return async dispatch => {
    const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));
    
    const validAccessToken = storedData && new Date(+storedData.tokenExpirationDate * 1000) > new Date();

    if (storedData?.uid && storedData?.accessToken && storedData?.client && validAccessToken) {
      dispatch(
        authActions.login({
          auth: {
            accessToken: storedData.accessToken,
            uid: storedData.uid,
            client: storedData.client,
            attributes: storedData.attributes,
            tokenExpirationDate: storedData.tokenExpirationDate
          },
        })
      );
    }

    dispatch(uisActions.setMode({
      mode: storedData.mode
    }));
  }
}