import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Image, Button, Space, Typography } from "antd";
import {
  cancelOrderAction,
  getListAllOrderAction,
  getListStatusOrderAction,
} from "../../../../Redux/actions/BuyerActions/ManageOrdersAction/ManageOrdersAction";
import moment from "moment";
import styles from "./OrderPage.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("ALL");

  const orderList = useSelector(
    (state) => state.ManageOrdersBuyerReducer.myListOrder
  );

  useEffect(() => {
    dispatch(getListAllOrderAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListStatusOrderAction());
  }, [dispatch]);

  const handlePaymenOrder = (orderId) => {
    navigate(`/home/payment/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrderAction(orderId));
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: ["event", "title"],
      key: "title",
    },
    {
      title: "Địa điểm",
      dataIndex: ["event", "location"],
      key: "location",
    },
    {
      title: "Banner",
      dataIndex: ["event", "bannerURL"],
      key: "bannerURL",
      render: (url) => (
        <Image
          src={url}
          alt="banner"
          width={120}
          style={{ borderRadius: 4, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gold";
        let text = "Chờ xử lý";
        if (status === "PAID") {
          color = "green";
          text = "Đã duyệt";
        } else if (status === "CANCELLED") {
          color = "red";
          text = "Đã hủy";
        } else if (status === "PENDING") {
          color = "orange";
          text = "Đang chờ";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (ts) =>
        ts ? moment(ts).format("DD/MM/YYYY HH:mm:ss") : "Không xác định",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        const isDisabled =
          record.status === "CANCELLED" || record.status === "PAID";
        return (
          <Space direction="vertical">
            <Button
              type="primary"
              onClick={() => handlePaymenOrder(record._id)}
              disabled={isDisabled}
            >
              Thanh toán
            </Button>
            <Button
              danger
              onClick={() => handleCancelOrder(record._id)}
              disabled={isDisabled}
            >
              Hủy
            </Button>
          </Space>
        );
      },
    },
  ];

  const filteredOrders =
    filterStatus === "ALL"
      ? orderList
      : orderList?.filter((order) => order.status === filterStatus);

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Đơn hàng của bạn</Title>

      <Space
        style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}
        size={12}
      >
        <Button
          className={`${styles["btn-orderPage"]} ${
            filterStatus === "ALL" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("ALL")}
        >
          Xem tất cả
        </Button>
        <Button
          className={`${styles["btn-orderPage"]} ${
            filterStatus === "PAID" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("PAID")}
        >
          Đã thanh toán
        </Button>
        <Button
          className={`${styles["btn-orderPage"]} ${
            filterStatus === "PENDING" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("PENDING")}
        >
          Đang chờ
        </Button>
        <Button
          className={`${styles["btn-orderPage"]} ${
            filterStatus === "CANCELLED" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("CANCELLED")}
        >
          Đã hủy
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={Array.isArray(filteredOrders) ? filteredOrders : []}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default OrderPage;
