import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  activateOrganizationAction,
  getListOrganizationAction,
  rejectOrganizationAction,
} from "../../../../Redux/actions/AdminActions/ManageOrganizationAction/ManageOrganizationAction";

function ManageOrganizationAdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOrganization } = useSelector(
    (state) => state.ManageOrganizationReducer
  );
  useEffect(() => {
    dispatch(getListOrganizationAction());
  }, [dispatch]);
  const handleActivate = (organizationId) => {
    dispatch(activateOrganizationAction(organizationId));
  };
  const handleReject = (organizationId) => {
    dispatch(rejectOrganizationAction(organizationId));
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Tên tổ chức",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "logoURL",
      dataIndex: "logoURL",
      key: "logoURL",
      render: (url) => (
        <img
          src={url}
          alt="logoURL"
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: "50%",
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          style={{
            maxWidth: 250,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={text}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Email liên hệ",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: "SĐT liên hệ",
      dataIndex: "contactPhone",
      key: "contactPhone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <div
          style={{
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={text}
        >
          {text}
        </div>
      ),
    },
    {
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
            maxWidth: 90,
          }}
        >
          <Button
            disabled={record.status === "APPROVED"}
            type="primary"
            onClick={() => handleActivate(record._id)}
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
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, marginBottom: 16, margin: 15 }}>
        Quản lý tổ chức
      </h2>
      <Table
        columns={columns}
        dataSource={listOrganization}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default ManageOrganizationAdminPage;
