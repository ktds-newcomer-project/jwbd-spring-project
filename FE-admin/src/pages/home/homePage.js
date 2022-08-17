import { Breadcrumb, Layout, Menu } from "antd";
import Calendar from "./Calender";
import React from "react";

const { Content } = Layout;

const app = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        className="site-layout-background"
        style={{
          padding: "24px 0",
        }}
      >
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <Calendar />
        </Content>
      </Layout>
    </>
  );
};

export default app;
