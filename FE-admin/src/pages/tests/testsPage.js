import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import SearchComponent from "./searchComponent";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
// http://localhost:8080/api/test
const App = () => {
  const [selectedMenu, setSelectedMenu] = useState("menu1Sub1");
  const [opendMenu, setOpendMenu] = useState("menu1");
  useEffect(() => {
    // console.log(menus[0]);
  }, []);

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const menu1Sub1 = {
    key: "menu1Sub1",
    label: "시험 리스트",
    onClick: handleMenuClick,
  };
  const menu1Sub2 = {
    key: "menu1Sub2",
    label: "시험 추가",
    onClick: handleMenuClick,
  };

  const menu1 = {
    key: "menu1",
    icon: React.createElement(UserOutlined),
    label: "Tests",
    children: [menu1Sub1, menu1Sub2],
  };
  const sideItem = [menu1];

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Tests</Breadcrumb.Item>
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
            defaultSelectedKeys={selectedMenu}
            defaultOpenKeys={opendMenu}
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
          {selectedMenu === "menu1Sub1" && <SearchComponent />}
          {selectedMenu === "menu1Sub2" && <div> hello2 </div>}
          {selectedMenu === "menu1Sub3" && <div> hello3 </div>}
          {selectedMenu === "menu1Sub4" && <div> hello4 </div>}
        </Content>
      </Layout>
    </>
  );
};

export default App;
