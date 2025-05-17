import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../../assets/Img/Logo/LogoHearder.png";
import "./HeaderLogin.css";

const { Header } = Layout;

function HeaderLogin() {
  return (
    <Layout>
      <Header className="header">
        {/* Logo */}
        <Link
          to="/home"
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
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
