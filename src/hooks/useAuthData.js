import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import LOCALSTORAGE_ITEMS from "../constants/localStorageItems";

export const useAuthData = () => {
  const dispatch = useDispatch();
  const { accessToken, tokenExpirationDate} = useSelector(state => state.authStore);

  const getUserDataLocalStorage = useCallback(() => {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));
  }, []);

  const removeUserDataLocalStorage = useCallback(() => {}, []);

  const setUserDataLocalStorage = useCallback(() => {}, []);
  
  const isValidAuthData = useCallback(() => {
    const storedData = getUserDataLocalStorage();
    
    if(!storedData){}

    const validAccessToken = new Date(+storedData.tokenExpirationDate * 1000) > new Date();
    
    return storedData?.uid && storedData?.accessToken && storedData?.client && storedData.accessToken && validAccessToken;
  },[getUserDataLocalStorage]); 
  
  const setTimeoOutForToken = useCallback(() => {
    if(tokenExpirationDate) {
      const remainingTime = new Date(+tokenExpirationDate * 1000).getTime() - new Date().getTime();

      setTimeout(() => {
        dispatch(authActions.logout());
      }, remainingTime);
    }
  },[tokenExpirationDate, dispatch]);

  return { isValidAuthData, setTimeoOutForToken, getUserDataLocalStorage }
}