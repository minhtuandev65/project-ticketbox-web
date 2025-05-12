import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Avatar,
  Typography,
  Tag,
  Skeleton,
  Select,
  Button,
  Modal,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import {
  getUserInfoAction,
  updateUserInfoAction,
} from "../../Redux/actions/ManageUsersAction/ManageUsersAction";
import styles from "./MyProfile.module.css";
import { createOrganizationAction } from "../../Redux/actions/VendorActions/ManageOrganizationAction/ManageOrganizationAction";
import OrganizationModalVendor from "../Vendor/Organization/OrganizationModalVendor";
import { useLocation } from "react-router-dom";
const { Title, Text } = Typography;

export default function MyProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const { userProfile } = useSelector((state) => state.ManageUsersReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formUpdate] = Form.useForm();
  const [isOrgModalVisible, setIsOrgModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  if (!userProfile || Object.keys(userProfile).length === 0) {
    return <Skeleton size="large" style={{ margin: 50 }} />;
  }

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
    return (
      <Tag color={info.color} className={styles.tag}>
        {info.label}
      </Tag>
    );
  };

  const openUpdateModal = () => {
    formUpdate.setFieldsValue({
      displayName: user.displayName,
      username: user.username,
      gender: user.gender?.[0] || "UNKNOWN",
      avatar: user.avatar
        ? [
            {
              uid: "-1",
              name: "avatar.jpg",
              status: "done",
              url: user.avatar,
            },
          ]
        : [],
    });
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    const formData = new FormData();
    formData.append("displayName", values.displayName);
    formData.append("username", values.username);
    formData.append("gender", values.gender);

    const fileList = values.avatar;
    if (fileList?.[0]?.originFileObj) {
      formData.append("avatar", fileList[0].originFileObj);
    }
    dispatch(updateUserInfoAction(formData));
    setIsModalVisible(false);
  };
  const handleCreateOrganization = (formData) => {
    console.log("Gửi formData đi:", formData);
    dispatch(createOrganizationAction(formData));
    setIsOrgModalVisible(false);
  };
  const user = userProfile;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Avatar src={user.avatar} size={150} className={styles.avatar} />
            <Title level={4} className={styles["text-responsive"]}>
              {user.displayName}
            </Title>
            <Button
              type="text"
              className={styles["btn-profile"]}
              onClick={openUpdateModal}
              style={{
                backgroundColor: "rgb(0, 0, 0)",
                color: "white",
                height: 40,
                fontSize: 14,
                borderRadius: 10,
                fontWeight: "bold",
                border: "none",
                marginLeft: 10,
              }}
            >
              Chỉnh sửa hồ sơ
            </Button>
          </div>

          <Form layout="vertical" className={styles["input-responsive"]}>
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
              {renderTag(roleMap, user.role?.[0])}
            </Form.Item>
            <Form.Item label="Ngày tham gia">
              <Input
                value={dayjs(user.createdAt).format("DD/MM/YYYY")}
                disabled
              />
            </Form.Item>
            <Form.Item label="Giới tính">
              {renderTag(genderMap, user.gender)}
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal
        title="Cập nhật hồ sơ"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => formUpdate.submit()}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={formUpdate}
          layout="vertical"
          onFinish={handleUpdate}
          className={styles.formResponsive}
        >
          <Form.Item
            label="Tên tài khoản"
            name="displayName"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Vui lòng tải lên avatar" }]}
          >
            <Upload
              listType="picture"
              accept="image/*"
              beforeUpload={() => false} // Không upload tự động
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải lên Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Select>
              <Select.Option value="MALE">Nam</Select.Option>
              <Select.Option value="FEMALE">Nữ</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal tạo tổ chức */}
      {(currentPath === "/vendor/info" || currentPath === "/admin/info") && (
        <OrganizationModalVendor
          open={isOrgModalVisible}
          onCancel={() => setIsOrgModalVisible(false)}
          onSubmit={handleCreateOrganization}
        />
      )}
    </>
  );
}
