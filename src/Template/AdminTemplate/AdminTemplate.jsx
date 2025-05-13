import React, { useState, useEffect } from "react";
import { Drawer, Layout, Menu, Table, Tooltip } from "antd";
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";
import "./css/AdminTemplate.css";
const { Sider, Content } = Layout;

function AdminTemplate() {
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
  const isDashboardRoot = location.pathname === "/admin";
  const getSelectedKey = () => {
    const defaultPath = "/admin";
    if (location.pathname.startsWith(`${defaultPath}/hot`)) return "2";
    if (location.pathname.startsWith(`${defaultPath}/events`)) return "1";
    return "";
  };

  const menuItems = [
    {
      key: "1",
      icon: (
        <Tooltip title="Xem danh sự kiện" className="ant-tooltip-inner">
          <CalendarOutlined />
        </Tooltip>
      ),
      label: (
        <Link
          to="/admin/events"
          style={{ textDecoration: "none", color: "#000" }}
        >
          Danh sách sự kiện hot
        </Link>
      ),
    },
    {
      key: "2",
      icon: (
        <Tooltip title="Danh sách sự kiện nóng" className="ant-tooltip-inner">
          <CalendarOutlined />
        </Tooltip>
      ),
      label: (
        <Link to="/admin/hot" style={{ textDecoration: "none", color: "#000" }}>
          Xem sự kiện nóng
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
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            onClick={() => setCollapsed(true)}
          />
        </Drawer>
      )}

      <Layout>
        <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />

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
      </Layout>
    </Layout>
  );
}

export default AdminTemplate;
