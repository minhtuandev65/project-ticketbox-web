import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveEventAction,
  getListEventsAllAction,
  rejectEventAction,
} from "../../../../Redux/actions/AdminActions/ManageEventsAction/ManageEventsAction";
import { Table, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";

function ManageEventsAdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listEventsAll } = useSelector((state) => state.ManageEventsReducer);
  useEffect(() => {
    dispatch(getListEventsAllAction(1000));
  }, [dispatch]);
  const handleApprove = (eventId) => {
    dispatch(approveEventAction(eventId));
  };
  const handleReject = (eventId) => {
    dispatch(rejectEventAction(eventId));
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Biển quảng cáo",
      dataIndex: "bannerURL",
      key: "bannerURL",
      render: (url) => (
        <img
          src={url}
          alt="banner"
          style={{
            width: 120,
            height: "auto",
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "categories",
      key: "categories",
      render: (cats) =>
        Array.isArray(cats) ? (
          cats.map((cat, index) => (
            <Tag
              key={`${cat}-${index}`}
              color="purple"
              style={{ marginBottom: 4 }}
            >
              {cat}
            </Tag>
          ))
        ) : cats ? (
          <Tag color="purple" style={{ marginBottom: 4 }}>
            {cats}
          </Tag>
        ) : null,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Vé còn",
      dataIndex: "availableTickets",
      key: "availableTickets",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status ? (
          <Tag
            color={
              status === "APPROVED"
                ? "green"
                : status === "CANCELLED"
                ? "red"
                : "gold"
            }
          >
            {status === "APPROVED"
              ? "Đã duyệt"
              : status === "CANCELLED"
              ? "Đã hủy"
              : "Bị từ chối"}
          </Tag>
        ) : null,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) =>
        record ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 100,
            }}
          >
            <Button
              disabled={record.status === "APPROVED"}
              type="primary"
              onClick={() => handleApprove(record._id)}
            >
              Phê duyệt
            </Button>
            <Button
              disabled={record.status === "CANCELLED"}
              danger
              onClick={() => handleReject(record._id)}
            >
              Từ chối
            </Button>
          </div>
        ) : null,
    },
    {
      title: "Chi tiết",

      key: "detail",
      render: (_, record) => (
        <Button
          className="btn-event"
          size="small"
          onClick={() => {
            navigate(`/admin/events/detail/${record._id}`);
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
    <div>
      <h2 style={{ fontSize: 24, marginBottom: 16, margin: 15 }}>
        Quản lý suất diễn
      </h2>

      <Table
        columns={columns}
        dataSource={listEventsAll}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ManageEventsAdminPage;
