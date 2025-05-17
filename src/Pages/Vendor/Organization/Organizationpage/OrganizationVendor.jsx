import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Avatar,
  Typography,
  Tag,
  Skeleton,
  Button,
  Descriptions,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import styles from "./Organization.module.css";
import { createOrganizationAction } from "../../../../Redux/actions/VendorActions/ManageOrganizationAction/ManageOrganizationAction";
import OrganizationModalVendor from "../OrganizationModal/OrganizationModalVendor";
import { getMyOrganizationAction } from "../../../../Redux/actions/VendorActions/ManageOrganizationAction/ManageOrganizationAction";

const { Title, Text } = Typography;

export default function OrganizationVendor() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.ManageUsersReducer);
  const { organization } = useSelector(
    (state) => state.ManageOrganizationVendorReducer
  );
  const isOrgApproved = organization?.status === "APPROVED";
  const [isOrgModalVisible, setIsOrgModalVisible] = useState(false);

  useEffect(() => {
    if (userProfile?._id) {
      dispatch(getMyOrganizationAction(userProfile._id));
    }
  }, [dispatch, userProfile?._id]);

  if (!userProfile || Object.keys(userProfile).length === 0) {
    return <Skeleton size="large" style={{ margin: 50 }} />;
  }

  const handleCreateOrganization = (formData) => {
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
              onClick={() => setIsOrgModalVisible(true)}
              style={{
                marginTop: 10,
                fontWeight: "bold",
                borderRadius: 8,
                backgroundColor: "#722ed1",
                border: "none",
                display: isOrgApproved ? "none" : "inline-block",
              }}
            >
              Tạo tổ chức
            </Button>
          </div>

          {organization && (
            <div className={styles.organizationInfo}>
              <Title level={5}>Thông tin tổ chức</Title>
              <Form layout="vertical">
                <Form.Item label="Logo">
                  <img src={organization.logoURL} alt="Logo" width={100} />
                </Form.Item>
                <Form.Item label="Tên tổ chức">
                  <Input
                    value={organization.name}
                    disabled
                    className={styles.textResponsive}
                    title={organization.name}
                  />
                </Form.Item>
                <Form.Item label="Trạng thái">
                  <Tag
                    color={
                      organization.status === "APPROVED"
                        ? "green"
                        : status === "PENDING"
                        ? "orange"
                        : "red"
                    }
                  >
                    {organization.status === "APPROVED"
                      ? "Đã duyệt"
                      : organization.status === "PENDING"
                      ? "Chờ duyệt"
                      : "Bị từ chối"}
                  </Tag>
                </Form.Item>
                <Form.Item label="Email liên hệ">
                  <Input
                    value={organization.contactEmail}
                    disabled
                    className={styles.textResponsive}
                    title={organization.contactEmail}
                  />
                </Form.Item>
                <Form.Item label="Điện thoại liên hệ">
                  <Input
                    value={organization.contactPhone}
                    disabled
                    className={styles.textResponsive}
                    title={organization.contactPhone}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ">
                  <Input
                    value={organization.address}
                    disabled
                    className={styles.textResponsive}
                    title={organization.address}
                  />
                </Form.Item>
                <Form.Item label="Ngày tham gia">
                  <Input
                    value={dayjs(organization.createdAt).format("DD/MM/YYYY")}
                    disabled
                    className={styles.textResponsive}
                  />
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
      {/* Modal tạo tổ chức */}
      <OrganizationModalVendor
        open={isOrgModalVisible}
        onCancel={() => setIsOrgModalVisible(false)}
        onSubmit={handleCreateOrganization}
      />
    </>
  );
}
