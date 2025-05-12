import React from "react";
import { Layout, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/Img/Logo/LogoHearder.png";
import "./HeaderRegister.css";

const { Header } = Layout;

function HeaderRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  const rolePaths = [
    { path: "/register/vendor", label: "Tạo sự kiện" },
    { path: "/register/buyer", label: "Mua vé" },
  ];

  const currentPath = location.pathname;

  // Danh sách các path được phép hiển thị nút
  const visiblePaths = ["/register/vendor", "/register/buyer", "/login"];

  // Nếu không nằm trong danh sách thì ẩn hết
  const shouldShowButtons = visiblePaths.includes(currentPath);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          width: "100vw",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 120px",
          background: "#000000",
          height: "80px",
        }}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <img src={logo} alt="logo" style={{ width: "200px" }} />
        </Link>

        {/* Hiển thị các nút nếu đang ở trong các trang được cho phép */}
        {shouldShowButtons && (
          <div
            className="header-btn-group"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            {rolePaths.map(
              (role) =>
                currentPath !== role.path && (
                  <Button
                    key={role.path}
                    type="text"
                    className="btn-register"
                    onClick={() => handleNavigate(role.path)}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      borderRadius: 10,
                      border: "2px solid #FFFFFF",
                      width: 200,
                      height: 50,
                      background: "transparent",
                    }}
                  >
                    {role.label}
                  </Button>
                )
            )}
            {currentPath !== "/login" && (
              <Link to={"/login"}>
                <Button className="btn-register" type="text">
                  Đăng Nhập
                </Button>
              </Link>
            )}
          </div>
        )}
      </Header>
    </Layout>
  );
}

export default HeaderRegister;
