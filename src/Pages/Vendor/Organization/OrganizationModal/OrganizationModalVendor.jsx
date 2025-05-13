import React from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./OrganizationModal.module.css";
function OrganizationModalVendor({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("contactEmail", values.contactEmail);
    formData.append("contactPhone", values.contactPhone);
    formData.append("address", values.address);
    formData.append("logoURL", values.logoURL);

    onSubmit(formData); // Gửi formData về component cha
    form.resetFields();
  };
  return (
    <>
      {/* Modal tạo tổ chức */}
      <Modal
        title="Tạo tổ chức"
        open={open}
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
        onOk={() => form.submit()}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            className={styles["formResponsive"]}
            label="Tên tổ chức"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên tổ chức" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            className={styles["formResponsive"]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Logo URL"
            name="logoURL"
            rules={[
              { required: true, message: "Vui lòng nhập URL logo" },
              { type: "url", message: "URL không hợp lệ" },
            ]}
          >
            <Input placeholder="https://example.com/logo.png" />
          </Form.Item>
          <Form.Item
            className={styles["formResponsive"]}
            label="Email liên hệ"
            name="contactEmail"
            rules={[{ type: "email", message: "Email không hợp lệ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={styles["formResponsive"]}
            label="Số điện thoại liên hệ"
            name="contactPhone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={styles["formResponsive"]}
            label="Địa chỉ"
            name="address"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default OrganizationModalVendor;
