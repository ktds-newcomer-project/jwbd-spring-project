import { Layout, Menu } from "antd";
import React from "react";

const { Content } = Layout;

const app = ({ children }) => {
  return (
    <>
      <Content
        style={{
          padding: "0 24px",
          minHeight: 280,
        }}
      >
        Content123123
      </Content>
    </>
  );
};

export default app;
