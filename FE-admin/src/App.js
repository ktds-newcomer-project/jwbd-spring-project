import LoginForm from "./component/LoginForm";
import { axiosInstance } from "./pages/api";
import React, { useEffect } from "react";
import { useMemberStore, useHelpStore } from "./states";
import Layout from "./pages/layout/layout";
import { BrowserRouter } from "react-router-dom";
import storage from "./mylib/storage";

function App() {
  const {
    setIsLogind,
    setUserToken,
    setUserName,
    setUserId,
    isLogind = false,
  } = useMemberStore();

  useEffect(() => {
    if (storage.get("isLogind")) {
      setIsLogind(storage.get("isLogind"));
      setUserName(storage.get("userName"));
    }
  }, []);

  const { setQryString, qryString } = useHelpStore();
  const LoginFunc = (userid, password) => {
    if (userid === "" || password === "") {
      return;
    }
    axiosInstance
      .get("/loginOk/0") //TODO: get -> post, + body
      .then((respones) => {
        setIsLogind(true);
        setUserToken(respones.data.token);
        setUserName(respones.data.name); //TODO: type -> name
        setUserId(userid);

        storage.set("userId", userid);
        storage.set("userName", respones.data.name);
        storage.set("isLogind", true);
        storage.set("validated", false);
        storage.set("token", respones.data.name);
      })
      .catch((error) => {
        setQryString("wrong1");
        console.log(qryString);
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
      <BrowserRouter>
        {!isLogind && <LoginForm LoginFunc={LoginFunc} />}
        {isLogind && <Layout></Layout>}
      </BrowserRouter>
    </div>
  );
}

export default App;
