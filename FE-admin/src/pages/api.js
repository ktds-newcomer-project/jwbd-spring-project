import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const axiosInstance = Axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
