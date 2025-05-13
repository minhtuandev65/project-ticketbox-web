import React from "react";
import { Layout, Typography } from "antd";
import logo from "../../../assets/Img/Logo/ticketbox.jpg"; // Đường dẫn đến logo
import "./FooterLogin.css"; // Import file CSS responsive cho Footer

const { Footer } = Layout;
const { Title } = Typography;

function FooterLogin() {
  return (
    <Footer className="footerLogin">
      <div className="footer-content">
        {/* Phần bên trái */}
        <div className="left-section">
          <img
            src={logo} // Đường dẫn đến logo
            alt="ticketbox"
            className="footer-logo"
          />
          <Title level={5} className="footer-title-left">
            Hệ thống quản lý và phân phối vé sự kiện hàng đầu Việt Nam <br />
            TicketBox Co. Ltd. © 2016
          </Title>
        </div>

        {/* Phần bên phải */}
        <div className="right-section">
          <Title level={5} className="footer-title-right">
            Công ty TNHH Ticketbox
          </Title>
          <Title level={5} className="footer-text-right">
            Đại diện theo pháp luật: Huỳnh Minh Tuấn
            <br />
            Địa chỉ: Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Phường
            12, Quận 10, TP. Hồ Chí Minh
            <br />
            Hotline: 1900.6408 - Email: support_abc@ticketbox.vn
            <br />
            Giấy chứng nhận đăng ký doanh nghiệp số: 0313605444, cấp lần đầu
            ngày 07/01/2016 bởi Sở Kế Hoạch và Đầu Tư TP. Hồ Chí Minh
          </Title>
        </div>
      </div>
    </Footer>
  );
}

export default FooterLogin;
