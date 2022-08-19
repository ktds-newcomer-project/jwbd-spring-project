import axios from "axios";

const API = axios.create({
  baseURL: "http://144.24.91.7/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default API;
