// src/pages/vendor/EventDetailPage.jsx
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Image,
  Tag,
  Button,
  Table,
  Space,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./EventDetail.module.css";
import { getOneDetailEventAction } from "../../../../Redux/actions/VendorActions/ManageEventsAction/ManageEventsAction";
import { createShowAction } from "../../../../Redux/actions/VendorActions/ManageEventsShowAction/ManageEventsShowAction";
import EventModalShowing from "../EventModalShowing/EventModalShowing";

const { Title, Paragraph, Text } = Typography;

export default function EventDetailPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const [showingModalVisible, setShowingModalVisible] = useState(false);
  useEffect(() => {
    dispatch(getOneDetailEventAction(eventId));
  }, [dispatch, eventId]);

  const { detailEvent } = useSelector(
    (state) => state.ManageEventsVendorReducer
  );

  const {
    title,
    description,
    bannerURL,
    date,
    location,
    totalTickets,
    availableTickets,
    price,
    vendor = [],
    organization,
    status,
    createdAt,
    isFree,
    isHot,
    isBookingAllowed,
    showings = [],
  } = detailEvent || [];

  const handleCreateShowing = (payload) => {
    dispatch(createShowAction(eventId, payload));
    setShowingModalVisible(false);
  };

  const showingColumns = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (s) => <Tag color={s === "BOOK_NOW" ? "green" : "red"}>{s}</Tag>,
    },
    {
      title: "Bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      render: (t) => dayjs(t).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (t) => dayjs(t).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Miễn phí",
      dataIndex: "isFree",
      key: "isFree",
      render: (f) => (f ? "Có" : "Không"),
    },
    {
      title: "Cho phép bán",
      dataIndex: "isSalable",
      key: "isSalable",
      render: (b) => (b ? "Có" : "Không"),
    },
    {
      title: "Chi tiết vé",
      key: "ticketTypes",
      render: (_, record) => (
        <Table
          dataSource={record.ticketTypes}
          pagination={false}
          size="small"
          rowKey="name"
          columns={[
            { title: "Tên vé", dataIndex: "name", key: "name" },
            {
              title: "Giá",
              dataIndex: "price",
              key: "price",
              render: (v) => v.toLocaleString() + "₫",
            },
            {
              title: "Số tối thiểu",
              dataIndex: "minQtyPerOrder",
              key: "minQtyPerOrder",
            },
            {
              title: "Số tối đa",
              dataIndex: "maxQtyPerOrder",
              key: "maxQtyPerOrder",
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={24}>
        <Col span={16}>
          <Image src={bannerURL} alt={title} style={{ marginBottom: 16 }} />
          <Title level={2}>{title}</Title>
          <Paragraph>{description}</Paragraph>

          <Space wrap size="large" style={{ marginBottom: 16 }}>
            <Text>
              <b>Ngày:</b> {dayjs(date).format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text>
              <b>Địa điểm:</b> {location}
            </Text>
            <Text>
              <b>Giá vé:</b>{" "}
              {isFree ? "Miễn phí" : `${price?.toLocaleString()}₫`}
            </Text>
            <Text>
              <b>Vé còn:</b> {availableTickets}/{totalTickets}
            </Text>
            <Text>
              <b>Hot:</b> {isHot ? "Có" : "Không"}
            </Text>
            <Text>
              <b>Cho phép đặt:</b> {isBookingAllowed ? "Có" : "Không"}
            </Text>
            <Text>
              <b>Trạng thái sự kiện:</b>{" "}
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
            </Text>
            <Text>
              <b>Vendor:</b> {vendor?.email}
            </Text>
            <Text>
              <b>Tổ chức:</b> {organization?.name}{" "}
            </Text>
            <Text>
              <b>Trạng thái tổ chức:</b>
              <Tag
                color={
                  organization?.status === "APPROVED"
                    ? "green"
                    : organization?.status === "PENDING"
                    ? "orange"
                    : "red"
                }
              >
                {organization?.status === "APPROVED"
                  ? "Đã duyệt"
                  : organization?.status === "PENDING"
                  ? "Chờ duyệt"
                  : "Bị từ chối"}
              </Tag>
            </Text>
            <Text>
              <b>Ngày tạo:</b> {dayjs(createdAt).format("DD/MM/YYYY")}
            </Text>
          </Space>

          {showings.length > 0 ? (
            <>
              <Title level={4}>Danh sách Suất diễn</Title>
              <Table
                dataSource={detailEvent.showings}
                columns={showingColumns}
                rowKey="_id"
                pagination={false}
                bordered
              />
            </>
          ) : (
            <Button
              type="text"
              className={styles["btn-detail"]}
              onClick={() => setShowingModalVisible(true)}
            >
              Tạo suất diễn
            </Button>
          )}
        </Col>
      </Row>

      <EventModalShowing
        open={showingModalVisible}
        onCancel={() => setShowingModalVisible(false)}
        onSubmit={handleCreateShowing}
      />
    </div>
  );
}
