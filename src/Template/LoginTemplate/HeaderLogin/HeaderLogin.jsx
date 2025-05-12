import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../../assets/Img/Logo/LogoHearder.png";
import "./HeaderLogin.css";

const { Header } = Layout;

function HeaderLogin() {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          justifyContent: "space-between",
          padding: "0 120px", // ✅ nhỏ hơn 250px để tránh chật ở 1024px
          background: "#000000",
          height: "80px",
        }}
      >
        {/* Logo */}
        <Link to="/home" style={{ textDecoration: "none" }}>
          <img src={logo} alt="logo" style={{ width: "200px" }} />
        </Link>

        {/* Nút điều hướng */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link to={"/register/vendor"}>
            <Button className="btn-register" type="text">
              Tạo sự kiện
            </Button>
          </Link>
        </div>
      </Header>
    </Layout>
  );
}

export default HeaderLogin;
