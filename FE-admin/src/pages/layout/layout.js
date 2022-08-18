import { Dropdown, Breadcrumb, Layout, Menu, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Router from "../router";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "./layout.css";
import { useMemberStore } from "../../states";
import storage from "../../mylib/storage";

const { Header, Content, Footer } = Layout;
const nav_name = ["/", "member", "tests"];
const App = () => {
  const [navIdx, setNavIdx] = useState("0");
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
      nav(nav_name[idx]);
      setNavIdx(idx.toString());
    };
  }

  const menuName = ["홈", "이용자 관리", "테스트 관리"];

  const items1 = ["0", "1", "2"].map((key, idx) => ({
    key,
    label: `${menuName[idx]}`,
    onClick: linkFn(idx),
  }));

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        message.error("뮤햐햐햐햐햐");
        break;
      case "2":
        message.success([userName]);
        break;
      case "3":
        message.info([userName] + "님 로그아웃 되었습니다.");
        break;
      default:
        message.error("허용되지 않는 동작입니다 : Develop");
        break;
    }
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

  useEffect(() => {
    let curr = window.location.pathname.substring(1);

    if (curr.length < 2) return;

    for (let name in nav_name) {
      if (curr === nav_name[name]) {
        setNavIdx(name);
      }
    }
  }, []);

  return (
    <Layout className="container">
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
          selectedKeys={navIdx}
          defaultSelectedKeys={"1"}
          items={items1}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Router></Router>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ⓒ 2022 직원병동 Corp. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default App;
