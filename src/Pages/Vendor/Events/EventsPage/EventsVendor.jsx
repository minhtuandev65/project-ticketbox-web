import React, { useEffect, useState } from "react";
import { Button, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventsAction,
  getListEventsAction,
} from "../../../../Redux/actions/VendorActions/ManageEventsAction/ManageEventsAction";
import dayjs from "dayjs";
import { getUserInfoAction } from "../../../../Redux/actions/ManageUsersAction/ManageUsersAction";
import { PlusOutlined } from "@ant-design/icons";
import EventsModalVendor from "../EventsModalVendor/EventsModalVendor";
const { Title } = Typography;
import "./events.css";
function EventsVendor() {
  const dispatch = useDispatch();
  const { listEvents } = useSelector(
    (state) => state.ManageEventsVendorReducer
  );
  const { userProfile } = useSelector((state) => state.ManageUsersReducer);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    // Nếu chưa có thông tin user thì gọi lại API
    if (!userProfile || Object.keys(userProfile).length === 0) {
      dispatch(getUserInfoAction());
    }
  }, [dispatch, userProfile]);
  useEffect(() => {
    dispatch(getListEventsAction());
  }, [dispatch]);

  const handleCreateEvent = (formData) => {
    dispatch(createEventsAction(formData));
    setOpenModal(false);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
      width: 60,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text) => <b>{text}</b>,
    },
    {
      ellipsis: true,
      title: "Biển quảng cáo",
      dataIndex: "bannerURL",
      key: "bannerURL",
      render: (url) => (
        <img
          src={url}
          alt="banner"
          style={{
            width: 120,
            height: 80,
            objectFit: "cover",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
      ),
    },
    {
      title: "Ngày diễn ra",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
      ellipsis: true,
    },
    {
      title: "Giá vé",
      dataIndex: "price",
      key: "price",
      render: (value) =>
        value === 0 ? "Miễn phí" : `${value.toLocaleString()}₫`,
    },
    {
      title: "Vé còn",
      dataIndex: "availableTickets",
      key: "availableTickets",
    },
    {
      ellipsis: true,
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "APPROVED"
            ? "green"
            : status === "PENDING"
            ? "orange"
            : "red";
        return <span style={{ color, fontWeight: 600 }}>{status}</span>;
      },
    },
  ];

  return (
    <div style={{ padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          Danh sách sự kiện của bạn
        </Title>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => setOpenModal(true)}
          className="btn-event"
        >
          Tạo sự kiện
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={Array.isArray(listEvents) ? listEvents : []}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        bordered
        style={{ marginTop: 16 }}
      />

      <EventsModalVendor
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}

export default EventsVendor;
