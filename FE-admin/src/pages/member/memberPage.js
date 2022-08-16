import { Layout } from "antd";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "./../../component/SideBar";

const { Content } = Layout;

const app = () => {
  return (
    <>
      <Sidebar />
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
