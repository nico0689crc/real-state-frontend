import axios from "axios";
import getUserData from "./getUserData.js";

export const axiosAdminPath = () => {
  const { uid, accessToken, client } = getUserData();

  const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ADMIN_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      uid: uid,
      "access-token": accessToken,
      client: client
    },
  });

  request.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return request;
}

export const axiosPublicPath = () => {
  const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_PUBLIC_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json"
    },
  });

  request.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return request;
}
