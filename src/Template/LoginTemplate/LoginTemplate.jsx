import React from "react";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import FooterLogin from "./FooterLogin/FooterLogin";
import { Outlet } from "react-router-dom";
function LoginTemplate() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Chiều cao tối thiểu toàn màn hình
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
        width: "100%",
      }}
    >
      <HeaderLogin />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <FooterLogin />
    </div>
  );
}

export default LoginTemplate;
