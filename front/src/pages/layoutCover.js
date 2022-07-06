import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import "./layout.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AreaChartOutlined,
  CommentOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import _ from "lodash";
const { Header, Sider, Content } = Layout;

const MENU = [
  {
    name: "Envoy",
    url: "/envoy",
    icon: AreaChartOutlined,
    position: "fixed",
  },
  {
    name: "Braintree",
    url: "/braintree",
    icon: CommentOutlined,
  },
  {
    name: "WU",
    url: "/wu",
    icon: UserAddOutlined,
  },
  {
    name: "Payoneer",
    url: "/payoneer",
    icon: UserAddOutlined,
  },
  {
    name: "CSV File Splitter",
    url: "/csv-splitter",
    icon: UserAddOutlined,
  },
  {
    name: "File Splitter",
    url: "/file",
    icon: CommentOutlined,
  },
];
const LayoutCover = (props) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  };

  const createIcon = (string) => {
    let component = React.createElement(string);
    return component;
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          className="sidebar"
        >
          <div className="logo mt-5" />
          {_.map(MENU, (data, index) => {
            return (
              <Menu.Item key={index}>
                <Link to={data.url}>
                  {createIcon(data.icon)}
                  <span>{data.name}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}

          <button type="button" className="btn btn-link btn-lg header-btn">
            Automation Payment Ops
          </button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "85vh",
            maxHeight: "87vh",
          }}
        >
          {children}{" "}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutCover;
