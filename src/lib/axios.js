import axios from "axios";
import getUserData from "./getUserData.js";

const { uid, accessToken, client } = getUserData();

const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
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

export default request;
