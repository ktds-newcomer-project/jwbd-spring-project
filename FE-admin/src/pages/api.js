import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const axiosInstance = Axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
