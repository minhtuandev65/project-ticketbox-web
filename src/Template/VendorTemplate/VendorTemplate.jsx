import React, { useState, useEffect } from "react";
import { Drawer, Layout, Menu, Table, Tooltip } from "antd";
import HeaderVendor from "./HeaderVendor/HeaderVendor";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";
import FooterVendor from "./FooterVendor/FooterVendor";
import "./css/VendorTemplate.css";
const { Sider, Content } = Layout;

function VendorTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();

  // 1. Xác định màn hình nhỏ
  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 2. KHI chuyển sang mobile => đóng Drawer (collapsed = true)
  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    }
  }, [isSmallScreen]);

  const columns = [];
  const filteredList = [];
  const isDashboardRoot = location.pathname === "/vendor";
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/vendor/events-hot")) return "1";
    if (location.pathname.startsWith("/vendor/organization")) return "2";
    return "";
  };

  const menuItems = [
    {
      key: "1",
      icon: (
        <Tooltip title="Xem sự kiện hot" className="ant-tooltip-inner">
          <CalendarOutlined />
        </Tooltip>
      ),
      label: (
        <Link
          to="/vendor/events-hot"
          style={{ textDecoration: "none", color: "#000" }}
        >
          Danh sách sự kiện hot
        </Link>
      ),
    },
    {
      key: "2",
      icon: (
        <Tooltip title="Tạo mới tổ chức" className="ant-tooltip-inner">
          <CalendarOutlined />
        </Tooltip>
      ),
      label: (
        <Link
          to="/vendor/organization"
          style={{ textDecoration: "none", color: "#000" }}
        >
          Tạo tổ chức
        </Link>
      ),
    },
    {
      key: "3",
      icon: (
        <Tooltip title="Danh sách sự kiện" className="ant-tooltip-inner">
          <CalendarOutlined />
        </Tooltip>
      ),
      label: (
        <Link
          to="/vendor/events"
          style={{ textDecoration: "none", color: "#000" }}
        >
          Danh sách sự kiện
        </Link>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isSmallScreen ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: "#fff" }}
        >
          <Menu
            style={{ marginTop: 80, background: "#fff" }}
            theme="light"
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
          />
        </Sider>
      ) : (
        <Drawer
          placement="left"
          open={!collapsed}
          onClose={() => setCollapsed(true)}
          width="50vw"
        >
          <Menu
            style={{ marginTop: 50 }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItems}
            onClick={() => setCollapsed(true)}
          />
        </Drawer>
      )}

      <Layout>
        <HeaderVendor collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {isDashboardRoot ? (
            <Table
              columns={columns}
              dataSource={filteredList}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          ) : (
            <Outlet />
          )}
        </Content>
        <FooterVendor />
      </Layout>
    </Layout>
  );
}

export default VendorTemplate;
