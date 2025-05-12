import React from "react";
import HeaderRegister from "./HeaderRegister/HeaderRegister";
import FooterRegister from "./FooterRegister/FooterRegister";
import { Outlet } from "react-router-dom";
function RegisterTemplate() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Chiều cao tối thiểu toàn màn hình
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
      }}
    >
      <HeaderRegister />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <FooterRegister />
    </div>
  );
}

export default RegisterTemplate;
