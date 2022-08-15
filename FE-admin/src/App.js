import LoginForm from "./component/LoginForm";
import { axiosInstance } from "./pages/api";
import useAxios from "axios-hooks";
import { React, useState } from "react";
import { useMemberStore } from "./states";
import { Navigate } from "react-router-dom";

function App() {
  const headers = { "Access-Control-Allow-Origin": "*" };
  const { data, loading, error } = useAxios({
    url: "http://localhost:8080/member",
    headers,
  });
  const userToken = JSON.parse(localStorage.getItem("token"));
  const LoginFunc = (username, password, remember) => {
    if (username === "" || password === "") {
      return;
    }
    let login_vo = { id: username, pwd: password };
    //localStorage.setItem("token", "1234");
    console.log(login_vo, userToken);
    // window.location.replace("/");
    axiosInstance
      .post("/member/login", { login_vo })
      .then((respones) => {
        console.log(username, password, remember);
      })
      .catch((error) => {
        console.log("Data", error.response.data);
        console.log("Status", error.response.status);
        console.log("Header", error.response.headers);
        console.log("Request", error.request);
        console.log("Error", error.message);
        console.log("Conifg", error.config);
      });
  };
  return (
    <div>
      {!userToken && <LoginForm LoginFunc={LoginFunc} />}
      {userToken && <div> hi </div>}
      <div>{userToken}</div>
    </div>
  );
}

export default App;
