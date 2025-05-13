import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Upload,
  Row,
  Col,
  message,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./EventsModal.module.css";

function EventsModalVendor({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("totalTickets", values.totalTickets);
    formData.append("availableTickets", values.availableTickets);
    formData.append("price", values.price);
    formData.append("bannerURL", values.bannerURL);
    formData.append("date", values.date.toISOString());
    formData.append("city", values.city);
    onSubmit(formData);
    form.resetFields();
    message.success("Tạo sự kiện thành công!");
  };
  return (
    <Modal
      title="Tạo sự kiện mới"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      okText="Tạo"
      cancelText="Hủy"
      centered
      width={700}
      className={styles.responsiveModal}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          totalTickets: 0,
          availableTickets: 0,
          price: 0,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
              className={styles.formResponsive}
            >
              <Input placeholder="Nhập tên sự kiện" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Ngày & giờ diễn ra"
              name="date"
              rules={[{ required: true, message: "Vui lòng chọn ngày giờ" }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} placeholder="Mô tả về sự kiện" />
        </Form.Item>

        <Form.Item
          label="Banner URL"
          name="bannerURL"
          rules={[
            { required: true, message: "Vui lòng nhập URL banner" },
            { type: "url", message: "URL không hợp lệ" },
          ]}
        >
          <Input placeholder="https://example.com/banner.png" />
        </Form.Item>
        <Form.Item
          label="Thành phố"
          name="city"
          rules={[{ required: true, message: "Vui lòng chọn thành phố" }]}
        >
          <Input placeholder="Nhập thành phố" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Địa điểm"
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa điểm" }]}
            >
              <Input placeholder="VD: Nhà Văn Hóa Thanh Niên, Hà Nội" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Giá vé (VNĐ)"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá vé" }]}
            >
              <InputNumber
                min={0}
                step={5000}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tổng số vé"
              name="totalTickets"
              rules={[{ required: true, message: "Vui lòng nhập số lượng vé" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Số vé còn lại"
              name="availableTickets"
              rules={[
                { required: true, message: "Vui lòng nhập số vé còn lại" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default EventsModalVendor;
