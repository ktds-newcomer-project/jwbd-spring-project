import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const menu1Sub1 = { key: "menu1Sub1", label: "사용자 리스트" };
const menu1Sub2 = { key: "menu1Sub2", label: "사용자 추가" };
const menu1Sub3 = { key: "menu1Sub3", label: "다중 사용자 추가" };
const menu1Sub4 = { key: "menu1Sub4", label: "사용자 수정" };

const menu1 = {
  key: "menu1",
  icon: React.createElement(UserOutlined),
  label: "Member",
  children: [menu1Sub1, menu1Sub2, menu1Sub3, menu1Sub4],
};
const menutmp = { key: "menu1", label: "사용자 추가(단일)" };
const sideItem = [menu1];

const app = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Member</Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        className="site-layout-background"
        style={{
          padding: "24px 0",
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["menu1Sub1"]}
            defaultOpenKeys={["menu1"]}
            style={{
              height: "100%",
            }}
            items={sideItem}
          />
        </Sider>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Content123123
        </Content>
      </Layout>
    </>
  );
};

export default app;
