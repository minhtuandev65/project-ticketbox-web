import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListUsersDetailAction } from "../../../../Redux/actions/AdminActions/ManageUserAction/ManageUserAction";
import { Skeleton, Avatar, Typography, Tag, Form, Input } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

export default function ManageUsersAdminDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { userDetail } = useSelector((state) => state.ManageUserReducer);

  useEffect(() => {
    dispatch(getListUsersDetailAction(userId));
  }, [dispatch, userId]);

  const user = userDetail?.[0];

  const genderMap = {
    MALE: { label: "Nam", color: "blue" },
    FEMALE: { label: "Nữ", color: "magenta" },
    UNKNOWN: { label: "Không xác định", color: "default" },
  };

  const roleMap = {
    ADMIN: { label: "Quản trị viên", color: "#ff4d4f" },
    BUYER: { label: "Người dùng", color: "#1890ff" },
    VENDOR: { label: "Ban tổ chức", color: "#52c41a" },
  };

  const renderTag = (map, value) => {
    const info = map[value] || map.UNKNOWN;
    return <Tag color={info.color}>{info.label}</Tag>;
  };

  if (!user) {
    return <Skeleton active />;
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar src={user.avatar} size={120} />
        <Title level={4}>{user.displayName}</Title>
      </div>

      <Form layout="vertical">
        <Form.Item label="Tên tài khoản">
          <Input value={user.displayName} disabled />
        </Form.Item>
        <Form.Item label="Họ và tên">
          <Input value={user.username} disabled />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={user.email} disabled />
        </Form.Item>
        <Form.Item label="Vai trò">
          {Array.isArray(user.role)
            ? user.role.map((r, index) => (
                <span key={r || index}>{renderTag(roleMap, r)}</span>
              ))
            : renderTag(roleMap, user.role)}
        </Form.Item>
        <Form.Item label="Ngày tham gia">
          <Input value={dayjs(user.createdAt).format("DD/MM/YYYY")} disabled />
        </Form.Item>
        <Form.Item label="Giới tính">
          {renderTag(genderMap, user.gender)}
        </Form.Item>
      </Form>
    </div>
  );
}
