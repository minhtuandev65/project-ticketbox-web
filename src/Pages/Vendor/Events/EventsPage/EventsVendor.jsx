import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Typography, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelEventAction,
  createEventsAction,
  getListEventsAction,
  updateEventAction,
} from "../../../../Redux/actions/VendorActions/ManageEventsAction/ManageEventsAction";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import EventsModalVendor from "../EventsModalVendor/EventsModalVendor";
const { Title } = Typography;
import "./events.css";
import EventsModalUpdateVendor from "../EventModalUpdate/EventModalUpdate";
import { useNavigate } from "react-router-dom";
function EventsVendor() {
  const dispatch = useDispatch();
  const { listEvents } = useSelector(
    (state) => state.ManageEventsVendorReducer
  );
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getListEventsAction());
  }, [dispatch]);

  const handleCreateEvent = (formData) => {
    dispatch(createEventsAction(formData));
    setOpenModal(false);
  };
  const handleCancelEvent = async (eventId) => {
    await dispatch(cancelEventAction(eventId));
  };
  const handleUpdateEvent = async (formData) => {
    if (selectedEvent?._id) {
      await dispatch(updateEventAction(selectedEvent._id, formData));
      setOpenUpdateModal(false);
      setSelectedEvent(null);
    }
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
      render: (status) => (
        <Tag
          color={
            status === "APPROVED"
              ? "green"
              : status === "PENDING"
              ? "orange"
              : "red"
          }
        >
          {status === "APPROVED"
            ? "Đã duyệt"
            : status === "PENDING"
            ? "Chờ duyệt"
            : "Bị từ chối"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: 100,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              setSelectedEvent(record);
              setOpenUpdateModal(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn hủy sự kiện này?"
            onConfirm={() => handleCancelEvent(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
            disabled={record.status === "CANCELLED"}
          >
            <Button
              danger
              disabled={record.status === "CANCELLED"}
            >
              Hủy
            </Button>
          </Popconfirm>
        </div>
      ),
      fixed: "right",
      width: 120,
    },
    {
      title: "Chi tiết",

      key: "detail",
      render: (_, record) => (
        <Button
          className="btn-event"
          size="small"
          onClick={() => {
            navigate(`/vendor/events/detail/${record._id}`);
          }}
        >
          Xem chi tiết
        </Button>
      ),
      fixed: "right",
      width: 120,
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
      <EventsModalUpdateVendor
        open={openUpdateModal}
        onCancel={() => {
          setOpenUpdateModal(false);
          setSelectedEvent(null);
        }}
        onSubmit={handleUpdateEvent}
        initialValues={selectedEvent}
      />
    </div>
  );
}

export default EventsVendor;
