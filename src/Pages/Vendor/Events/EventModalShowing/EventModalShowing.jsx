// src/components/Events/ShowingModal.jsx
import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Space,
  Divider,
  message,
  Row,
  Col,
} from "antd";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "./EventModalShowing.css";
export default function EventModalShowing({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // Convert DatePicker values to ISO strings
    const payload = {
      status: values.status,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime.toISOString(),
      isFree: values.isFree,
      isSalable: values.isSalable,
      ticketTypes: values.ticketTypes.map((t) => ({
        ...t,
        startTime: t.startTime.toISOString(),
        endTime: t.endTime.toISOString(),
      })),
    };
    onSubmit(payload);
    form.resetFields();
    message.success("Tạo suất diễn thành công!");
  };

  return (
    <Modal
      title="Tạo suất diễn mới"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      okText="Tạo"
      cancelText="Hủy"
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          status: "BOOK_NOW",
          isFree: false,
          isSalable: true,
          ticketTypes: [
            {
              name: "",
              price: 0,
              originalPrice: 0,
              maxQtyPerOrder: 1,
              minQtyPerOrder: 1,
            },
          ],
        }}
      >
        <Form.Item
          name="status"
          label="Trạng thái suất diễn"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="BOOK_NOW">BOOK_NOW</Select.Option>
            <Select.Option value="SOLD_OLD">SOLD_OLD</Select.Option>
            <Select.Option value="COMING_SOON">COMING_SOON</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Thời gian bắt đầu"
          rules={[{ required: true, message: "Chọn thời gian bắt đầu" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="Thời gian kết thúc"
          rules={[{ required: true, message: "Chọn thời gian kết thúc" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Space size="large">
          <Form.Item name="isFree" initialValue={false}>
            <Select>
              <Select.Option value={false}>Không miễn phí</Select.Option>
              <Select.Option value={true}>Miễn phí</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="isSalable" initialValue={false}>
            <Select>
              <Select.Option value={true}>Cho phép bán vé</Select.Option>
              <Select.Option value={false}>Không cho phép</Select.Option>
            </Select>
          </Form.Item>
        </Space>

        <Divider orientation="left">Ticket Types</Divider>
        <Form.List name="ticketTypes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="ticket-block"
                  style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        label="Tên vé"
                        rules={[{ required: true, message: "Nhập tên vé" }]}
                      >
                        <Input placeholder="e.g. VIP01" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Giá"
                        rules={[{ required: true, message: "Nhập giá" }]}
                      >
                        <InputNumber
                          min={0}
                          formatter={(v) =>
                            `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "originalPrice"]}
                        label="Giá gốc"
                      >
                        <InputNumber
                          min={0}
                          formatter={(v) =>
                            `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "minQtyPerOrder"]}
                        label="Min"
                        rules={[{ required: true }]}
                      >
                        <InputNumber min={1} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "maxQtyPerOrder"]}
                        label="Max"
                        rules={[{ required: true }]}
                      >
                        <InputNumber min={1} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        style={{ marginTop: 30 }}
                      />
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "startTime"]}
                        label="Bắt đầu vé"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "endTime"]}
                        label="Kết thúc vé"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "status"]}
                        label="Trạng thái vé"
                        rules={[{ required: true }]}
                      >
                        <Select style={{ width: "100%" }}>
                          <Select.Option value="BOOK_NOW">
                            Đang mở bán
                          </Select.Option>
                          <Select.Option value="SOLD_OUT">Hết vé</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm loại vé
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}
