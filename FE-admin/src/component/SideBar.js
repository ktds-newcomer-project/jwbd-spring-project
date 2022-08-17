import { Layout, Menu } from "antd";
import React from "react";

const { Sider } = Layout;

const SideBar = (item) => {
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
        }}
        items={item}
      />
    </Sider>
  );
};

export default SideBar;
