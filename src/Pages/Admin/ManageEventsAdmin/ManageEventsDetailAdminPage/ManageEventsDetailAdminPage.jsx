// src/pages/vendor/EventDetailPage.jsx
import React, { useEffect } from "react";
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
  Descriptions,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./EventDetail.module.css";

import {
  approveEventAction,
  rejectEventAction,
} from "../../../../Redux/actions/AdminActions/ManageEventsAction/ManageEventsAction";
import { getListDetailEventsAction } from "../../../../Redux/actions/AdminActions/ManageEventsAction/ManageEventsAction";

const { Title, Paragraph, Text } = Typography;

export default function ManageEventDetailAdminPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListDetailEventsAction(eventId));
  }, [dispatch, eventId]);

  const { listDetailEvents } = useSelector(
    (state) => state.ManageEventsReducer
  );

  const handleApprove = (eventId) => {
    dispatch(approveEventAction(eventId));
  };
  const handleReject = (eventId) => {
    dispatch(rejectEventAction(eventId));
  };
  const {
    title,
    description,
    location,
    totalTickets,
    availableTickets,
    price,
    bannerURL,
    date,
    city,
    vendor = [],
    organization = [],
    status,
    createdAt,
    isFree,
    isHot,
    isBookingAllowed,
    showings = [],
  } = listDetailEvents || [];
  console.log("tổ chức", listDetailEvents.organization);
  const showingColumns = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "BOOK_NOW"
              ? "green"
              : status === "SOLD_OUT"
              ? "red"
              : "default"
          }
        >
          {status === "BOOK_NOW"
            ? "Có thể đặt"
            : status === "SOLD_OUT"
            ? "Hết vé"
            : "Ngừng đặt"}
        </Tag>
      ),
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
  ];
  const organizationColumns = [
    {
      title: "Tên tổ chức",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email liên hệ",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: "Số điện thoại",
      dataIndex: "contactPhone",
      key: "contactPhone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc) => (
        <Paragraph ellipsis={{ rows: 2, expandable: true }}>{desc}</Paragraph>
      ),
    },
    {
      title: "Logo",
      dataIndex: "logoURL",
      key: "logoURL",
      render: (url) => <Image src={url} alt="logo" width={80} height={80} />,
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => dayjs(time).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={32}>
        <Col span={24}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Image
              src={bannerURL}
              alt={title}
              style={{ borderRadius: 8, maxHeight: 400, objectFit: "cover" }}
            />
          </div>
          <Title level={2}>
            <b>Tên sự kiện: </b>
            {title}
          </Title>
          <Descriptions
            bordered
            column={1}
            size="middle"
            style={{ marginBottom: 32 }}
          >
            <Descriptions.Item label="Mô tả">
              <Paragraph
                ellipsis={{
                  rows: 3,
                  expandable: true,
                  symbol: "Xem thêm",
                }}
                style={{ marginBottom: 0 }}
              >
                {description}
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
          <Space style={{ marginBottom: 24 }}>
            <Button
              type="primary"
              onClick={() => handleApprove(eventId)}
              disabled={status === "APPROVED"}
            >
              Duyệt sự kiện
            </Button>
            <Button
              danger
              onClick={() => handleReject(eventId)}
              disabled={status === "REJECTED"}
            >
              Từ chối sự kiện
            </Button>
          </Space>

          <Descriptions
            bordered
            column={{ xs: 1, sm: 1, md: 2 }}
            size="middle"
            title="Thông tin sự kiện"
            style={{ marginBottom: 32 }}
          >
            <Descriptions.Item label="Ngày">
              {dayjs(date).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Thành phố">{city}</Descriptions.Item>
            <Descriptions.Item label="Địa điểm">{location}</Descriptions.Item>
            <Descriptions.Item label="Giá vé">
              {isFree ? "Miễn phí" : `${price?.toLocaleString()}₫`}
            </Descriptions.Item>
            <Descriptions.Item label="Số vé còn lại">
              {availableTickets}/{totalTickets}
            </Descriptions.Item>
            <Descriptions.Item label="Sự kiện được yêu thích">
              {isHot ? "Có" : "Không"}
            </Descriptions.Item>
            <Descriptions.Item label="Cho phép đặt vé">
              {isBookingAllowed ? "Có" : "Không"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái sự kiện">
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
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(createdAt).format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            bordered
            column={{ xs: 1, sm: 1, md: 2 }}
            size="middle"
            title="Thông tin tổ chức"
            style={{ marginBottom: 32 }}
          >
            <Descriptions.Item label="Người tạo sự kiện">
              {vendor?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Tên tổ chức">
              {organization?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái tổ chức">
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
            </Descriptions.Item>
          </Descriptions>

          {showings.length > 0 ? (
            <>
              <Title level={4}>Danh sách Suất diễn</Title>
              <Table
                dataSource={listDetailEvents.showings}
                columns={showingColumns}
                rowKey="_id"
                pagination={false}
                bordered
                scroll={{ x: "max-content" }}
                expandable={{
                  expandedRowRender: (record) => (
                    <div style={{ overflowX: "auto" }}>
                      <Table
                        dataSource={record.ticketTypes}
                        columns={[
                          {
                            title: "Loại vé",
                            dataIndex: "name",
                            key: "name",
                          },
                          {
                            title: "Giá vé",
                            dataIndex: "price",
                            key: "price",
                            render: (v) =>
                              typeof v === "number"
                                ? v.toLocaleString() + "₫"
                                : "Miễn phí",
                          },
                          {
                            title: "Số lượng tối thiểu",
                            dataIndex: "minQtyPerOrder",
                            key: "minQtyPerOrder",
                          },
                          {
                            title: "Số lượng tối đa",
                            dataIndex: "maxQtyPerOrder",
                            key: "maxQtyPerOrder",
                          },
                          {
                            title: "Trạng thái vé",
                            dataIndex: "status",
                            key: "status",
                            render: (status) => (
                              <Tag
                                color={
                                  status === "BOOK_NOW"
                                    ? "green"
                                    : status === "SOLD_OUT"
                                    ? "red"
                                    : "default"
                                }
                              >
                                {status === "BOOK_NOW"
                                  ? "Có thể đặt"
                                  : status === "SOLD_OUT"
                                  ? "Hết vé"
                                  : "Ngừng đặt"}
                              </Tag>
                            ),
                          },
                        ]}
                        rowKey="name"
                        pagination={false}
                        size="small"
                        scroll={{ x: "max-content" }}
                      />
                    </div>
                  ),
                  rowExpandable: (record) =>
                    Array.isArray(record.ticketTypes) &&
                    record.ticketTypes.length > 0,
                }}
              />
            </>
          ) : (
            <Title type="text">Sự kiện này chưa có suất diễn</Title>
          )}
          {organization && Object.keys(organization).length > 0 ? (
            <>
              <Title level={4}>Thông tin tổ chức</Title>
              <Table
                dataSource={[listDetailEvents.organization]}
                columns={organizationColumns}
                rowKey="_id"
                pagination={false}
                bordered
                scroll={{ x: "max-content" }}
              />
            </>
          ) : (
            <Title type="text">Chưa có tổ chức</Title>
          )}
        </Col>
      </Row>
    </div>
  );
}
