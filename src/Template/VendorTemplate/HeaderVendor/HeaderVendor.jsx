import React, { useEffect } from "react";
import { Layout, Typography, Avatar, Dropdown, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { manageUsersService } from "../../../Services/ManageUsersService/ManageUsersService";
import { SET_USER_LOGIN } from "../../../Redux/type/UsersType/UsersType";
const { Header } = Layout;
import styles from "./HeaderVendor.module.css";
import { getUserInfoAction } from "../../../Redux/actions/ManageUsersAction/ManageUsersAction";
const getProfilePath = (roles = []) => {
  if (roles.includes("ADMIN")) return "/admin/info";
  if (roles.includes("VENDOR")) return "/vendor/info";
  return "/";
};
function HeaderVandor({ collapsed, setCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((state) => state.ManageUsersReducer);
  useEffect(() => {
    // Nếu chưa có thông tin user thì gọi lại API
    if (!userProfile || Object.keys(userProfile).length === 0) {
      dispatch(getUserInfoAction());
    }
  }, [dispatch, userProfile]);
  const handleLogout = async () => {
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    await manageUsersService.userLogout();
    dispatch({ type: SET_USER_LOGIN, payload: null });
    navigate("/login");
  };
  const handleGoToProfile = () => {
    const path = getProfilePath(userProfile?.role || []);
    navigate(path);
  };
  const menuItems = [
    {
      key: "1",
      label: <span onClick={handleGoToProfile}>Thông tin cá nhân</span>,
    },
    {
      key: "2",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        background: "#000000",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        height: 64,
      }}
    >
      {/* Trigger + Title */}
      <div className="flex items-center gap-4">
        <Button
          // type="ghost"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: 20,
            color: "black",
            backgroundColor: "white",
            marginRight: 10,
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Typography.Title
          className={styles.titleTruncate}
          level={5}
          style={{
            marginTop: 2,
            fontWeight: "800",
            lineHeight: 1, // đảm bảo không bị lệch chiều cao
          }}
        >
          <Link to={"/vendor"} style={{ color: "#fff" }}>
            VendorDashboard
          </Link>
        </Typography.Title>
      </div>
      {/* Email + Avatar */}
      {userProfile?.displayName ? (
        <div className="flex items-center gap-3 max-w-[250px] overflow-hidden">
          <Typography.Text
            strong
            className={styles.emailTruncate}
            style={{ maxWidth: "150px", color: "white" }}
          >
            Xin chào, {userProfile.displayName}
          </Typography.Text>
          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <Avatar
              src={userProfile.avatar}
              style={{ cursor: "pointer", marginLeft: 5, marginBottom: 15 }}
            ></Avatar>
          </Dropdown>
        </div>
      ) : (
        <Link to="/login" className="text-white font-semibold">
          <Typography.Text strong style={{ color: "white" }}>
            Login Vendor
          </Typography.Text>
        </Link>
      )}
    </Header>
  );
}

export default HeaderVandor;
