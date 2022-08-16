import { Dropdown, Breadcrumb, Layout, Menu, message, Space } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Router from "../router";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "./layout.css";
import { useMemberStore } from "../../states";
import storage from "../../lib/storage";
import Logout from "../../lib/logout";

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    isLogind,
    userName,
    setIsLogind,
    setValidated,
    setUserToken,
    setUserName,
    setUserId,
  } = useMemberStore();
  const nav = useNavigate();
  useEffect(() => {
    if (!isLogind) window.location.href = "/";
  }, [isLogind]);

  function linkFn(idx) {
    return () => {
      if (idx === 0) {
        nav("/");
      } else if (idx === 1) {
        nav("/nav2");
      } else if (idx === 2) {
        nav("/nav3");
      }
    };
  }

  const menuName = ["홈", "이용자 관리", "테스트 관리"];

  const items1 = ["1", "2", "3"].map((key, idx) => ({
    key,
    label: `${menuName[idx]}`,
    onClick: linkFn(idx),
  }));

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "1st menu item",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "2nd menu item",
          key: "2",
          icon: <UserOutlined />,
        },
        {
          label: "Logout",
          key: "3",
          icon: <UserOutlined />,
          onClick: () => {
            setIsLogind(false);
            setValidated(false);
            setUserToken("");
            setUserName("");
            setUserId("");
            storage.remove("isLogind");
            storage.remove("validated");
            storage.remove("token");
            storage.remove("userId");
            storage.remove("userName");
          },
        },
      ]}
    />
  );

  return (
    <Layout>
      <Header className="header">
        {/* <Image className="logo" src={KTDS} /> */}
        <Dropdown className="profile" overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {userName} [3급]
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{
            padding: "24px 0",
          }}
        >
          <Router></Router>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
