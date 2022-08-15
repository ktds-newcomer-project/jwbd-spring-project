import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const axiosInstance = Axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
