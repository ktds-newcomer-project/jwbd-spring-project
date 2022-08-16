import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./home/homePage";
import MemberPage from "./member/memberPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nav2" element={<MemberPage />} />
      </Routes>
    </>
  );
};

export default Router;
