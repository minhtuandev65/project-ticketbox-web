import React from "react";
import HomeHeader from "../HomeTemplate/Layout/Header/HomeHeader";
import HomeFooter from "../HomeTemplate/Layout/Footer/HomeFooter";

import { Outlet } from "react-router-dom";
function HomeTemplate() {
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
      <HomeHeader />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <HomeFooter />
    </div>
  );
}

export default HomeTemplate;
