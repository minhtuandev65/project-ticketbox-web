import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveEventAction,
  getListEventsAllAction,
  rejectEventAction,
} from "../../../../Redux/actions/AdminActions/ManageEventsAction/ManageEventsAction";
import { Table, Button, Tag, Space } from "antd";
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
        cats?.map((cat, index) => (
          <Tag key={index} color="purple" style={{ marginBottom: 4 }}>
            {cat}
          </Tag>
        )),
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
      render: (status) => (
        <Tag
          color={
            status === "ACTIVE"
              ? "green"
              : status === "CANCELLED"
              ? "red"
              : "gold"
          }
        >
          {status}
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
          <Button type="primary" onClick={() => handleApprove(record._id)}>
            Phê duyệt
          </Button>
          <Button danger onClick={() => handleReject(record._id)}>
            Từ chối
          </Button>
        </div>
      ),
    },
    {
      title: "Chi tiết",

      key: "detail",
      render: (_, record) => (
        <Button
          className="btn-event"
          size="small"
          onClick={() => {
            navigate(`/admin/detail/${record._id}`);
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
