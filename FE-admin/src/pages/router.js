import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./home/homePage";
import MemberPage from "./member/memberPage";
import TestsPage from "./tests/testsPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/tests" element={<TestsPage />} />
      </Routes>
    </>
  );
};

export default Router;
