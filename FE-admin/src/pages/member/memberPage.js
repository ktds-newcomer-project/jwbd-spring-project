import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import SearchComponent from "./searchComponent";
import AddComponent from "./addComponent";
import UploadComponent from "./uploadComponent";
import { useHelpStore } from "../../states";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
// http://localhost:8080/api/test
const App = () => {
  const { setSelectedMenu, selectedMenu } = useHelpStore();
  const [opendMenu, setOpendMenu] = useState("menu1");

  useEffect(() => {
    setSelectedMenu("menu1Sub1");
  }, []);

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const menu1Sub1 = {
    key: "menu1Sub1",
    label: "사용자 리스트",
    onClick: handleMenuClick,
  };
  const menu1Sub2 = {
    key: "menu1Sub2",
    label: "사용자 추가",
    onClick: handleMenuClick,
  };
  const menu1Sub3 = {
    key: "menu1Sub3",
    label: "다중 사용자 추가",
    onClick: handleMenuClick,
  };
  const menu1Sub4 = {
    key: "menu1Sub4",
    label: "사용자 수정",
    onClick: handleMenuClick,
  };

  const menu1 = {
    key: "menu1",
    icon: React.createElement(UserOutlined),
    label: "Member",
    children: [menu1Sub1, menu1Sub2, menu1Sub3, menu1Sub4],
  };
  const sideItem = [menu1];

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
            defaultSelectedKeys="menu1Sub1"
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
          {selectedMenu === "menu1Sub2" && <AddComponent />}
          {selectedMenu === "menu1Sub3" && (
            <div>
              hello3
              <UploadComponent />
            </div>
          )}
          {selectedMenu === "menu1Sub4" && <div> hello4 </div>}
        </Content>
      </Layout>
    </>
  );
};

export default App;
