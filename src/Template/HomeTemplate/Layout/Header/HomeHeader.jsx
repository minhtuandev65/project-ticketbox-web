import React, { useEffect, useState } from "react";
import { Layout, Input, Button, Avatar, Typography, Dropdown } from "antd";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../assets/Img/Logo/LogoHearder.png";
import styles from "./HomeHeader.module.css";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

import { getUserInfoAction } from "../../../../Redux/actions/ManageUsersAction/ManageUsersAction";
import { manageUsersService } from "../../../../Services/ManageUsersService/ManageUsersService";
import { SearchTextAction } from "../../../../Redux/actions/BuyerActions/SearchAction/SearchAction";
const { Header } = Layout;
const { Group: InputGroup } = Input;

function HomeHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((state) => state.ManageUsersReducer);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    // Nếu chưa có thông tin user thì gọi lại API
    if (!userProfile || Object.keys(userProfile).length === 0) {
      dispatch(getUserInfoAction());
    }
  }, [dispatch, userProfile]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(SearchTextAction(searchQuery)); // Gửi yêu cầu tìm kiếm khi nhấn tìm kiếm
      navigate(`/home/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  const saveSearchHistory = (query) => {
    const existing = JSON.parse(localStorage.getItem("SEARCH_HISTORY") || "[]");
    const updated = [query, ...existing.filter((item) => item !== query)];
    localStorage.setItem(
      "SEARCH_HISTORY",
      JSON.stringify(updated.slice(0, 10))
    ); // chỉ giữ 10 kết quả gần nhất
  };

  const handleLogout = async () => {
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    await manageUsersService.userLogout();
    navigate("/login");
  };
  const handleGoToProfile = () => {
    if (userProfile?.role?.includes("BUYER")) {
      navigate("/home/info");
    }
  };
  const handleGoToOrderPage = () => {
    navigate("/home/order");
  };
  const handleGoToTicketPage = () => {
    navigate("/home/ticket");
  };
  const handleCreateVendor = async () => {
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    await manageUsersService.userLogout();
    navigate("/register/vendor");
  };
  const menuItems = [
    {
      key: "1",
      label: <span onClick={handleCreateVendor}>Tạo sự kiện</span>,
    },
    {
      key: "2",
      label: <span onClick={handleGoToOrderPage}>Vé đã đặt</span>,
    },
    {
      key: "3",
      label: <span onClick={handleGoToTicketPage}>Vé đã mua</span>,
    },
  ];
  const avataMenuItems = [
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
      className={styles["header-container"]}
      style={{
        height: 80,
        padding: "0 120px",
      }}
    >
      <Link
        to="/home"
        style={{ display: "flex", alignItems: "center", height: "100%" }}
      >
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          style={{ width: "200px" }}
        />
      </Link>

      {/* Desktop Search */}
      <div className={styles["search-wrapper"]}>
        <Input
          prefix={<SearchOutlined style={{ color: "#8C8C8C" }} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={handleSearch}
          placeholder="Bạn tìm gì hôm nay?"
          style={{
            flex: 1,
            borderRadius: "10px",
            color: "#595959",
            height: 40,
          }}
        />
        <Button
          onClick={handleSearch}
          className={styles["btn-search"]}
          style={{
            borderRadius: "0 30px 30px 0",
            height: 40,
            width: 100,
            fontWeight: "bold",
          }}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Mobile Search Popup */}
      {showMobileSearch && (
        <div className={styles["mobile-search-popup"]}>
          <div className={styles["popup-content"]}>
            <CloseOutlined
              className={styles["close-icon"]}
              onClick={() => setShowMobileSearch(false)}
            />
            <Input
              placeholder="Bạn tìm gì hôm nay?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: "100%", marginBottom: 10 }}
            />
            <Button type="primary" block onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </div>
        </div>
      )}

      {userProfile?.displayName ? (
        <div className="flex items-center gap-3 max-w-[250px] overflow-hidden">
          {/* Nút menu kế bên avatar */}
          <Dropdown menu={{ items: menuItems }} placement="bottom">
            <Button type="text" className={styles["btn-menu"]}>
              Menu
            </Button>
          </Dropdown>
          <Typography.Text
            strong
            className={styles.emailTruncate}
            style={{ maxWidth: "150px", color: "white" }}
          >
            Xin chào, {userProfile.displayName}
          </Typography.Text>
          <Dropdown menu={{ items: avataMenuItems }} placement="bottomRight">
            <Avatar
              src={userProfile.avatar}
              style={{ cursor: "pointer", marginLeft: 5 }}
            ></Avatar>
          </Dropdown>
        </div>
      ) : (
        <Link to="/login" className="text-white font-semibold">
          <Typography.Text strong style={{ color: "white" }}>
            Đăng nhập
          </Typography.Text>
        </Link>
      )}
    </Header>
  );
}

export default HomeHeader;
