import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getListAllUsersAction,
  blockUserAction,
} from "../../../../Redux/actions/AdminActions/ManageUserAction/ManageUserAction";

function ManageUsersAdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listAllUsers } = useSelector((state) => state.ManageUserReducer);

  useEffect(() => {
    dispatch(getListAllUsersAction());
  }, [dispatch]);
  const handleBlockUser = (userId) => {
    dispatch(blockUserAction(userId));
  };
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (roles) => (
        <Space>
          {roles.map((role) => (
            <Tag
              key={role}
              color={
                role === "ADMIN" ? "red" : role === "VENDOR" ? "yellow" : "blue"
              }
            >
              {role === "ADMIN"
                ? "Quản trị viên"
                : role === "VENDOR"
                ? "Người tạo sự kiện"
                : "Người dùng"}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          <Button
            danger
            type="primary"
            style={{
              width: 90,
              height: 25,
            }}
            size="small"
            onClick={() => {
              handleBlockUser(record._id);
            }}
          >
            Chặn
          </Button>
        </div>
      ),
    },
    {
      title: "Chi tiết người dùng",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          <Button
            className="btn-event"
            type="primary"
            size="small"
            onClick={() => navigate(`/admin/users/detail/${record._id}`)}
          >
            Xem chi tiết
          </Button>
          {/* You can add other actions like edit, delete, or block */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, marginBottom: 16, margin: 15 }}>
        Quản lý người dùng
      </h2>
      <Table
        columns={columns}
        dataSource={listAllUsers}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default ManageUsersAdminPage;
