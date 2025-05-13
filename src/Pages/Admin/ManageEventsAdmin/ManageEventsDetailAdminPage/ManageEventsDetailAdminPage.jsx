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
          <Image src={bannerURL} alt={title} style={{ marginBottom: 16 }} />
          <Title level={2}>{title}</Title>
          <Paragraph>{description}</Paragraph>

          <Space wrap size="large" style={{ marginBottom: 16 }}>
            <Text>
              <b>Ngày: </b> {dayjs(date).format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text>
              <b>Địa điểm: </b> {location}
            </Text>
            <Text>
              <b>Giá vé: </b>{" "}
              {isFree ? "Miễn phí" : `${price?.toLocaleString()}₫`}
            </Text>
            <Text>
              <b>Vé còn: </b> {availableTickets}/{totalTickets}
            </Text>
            <Text>
              <b>Hot: </b> {isHot ? "Có" : "Không"}
            </Text>
            <Text>
              <b>Cho phép đặt: </b> {isBookingAllowed ? "Có" : "Không"}
            </Text>
            <Text>
              <b>Trạng thái sự kiện: </b>{" "}
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
            <div className={styles.actionButtons}>
              <Button
                type="primary"
                danger
                onClick={() => handleReject(eventId)}
                style={{ minWidth: 120 }}
              >
                Từ chối sự kiện
              </Button>
              <Button type="primary" onClick={() => handleApprove(eventId)}>
                Duyệt sự kiện
              </Button>
            </div>

            <Text>
              <b>Vendor: </b> {vendor?.email}
            </Text>
            <Text>
              <b>Tên tổ chức: </b> {organization?.name}{" "}
            </Text>
            <Text>
              <b>Trạng thái tổ chức: </b>
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
            <Text>
              <b>Thành phố: </b>
              {city}
            </Text>
          </Space>

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
                            title: "Thứ hạng vé",
                            dataIndex: "name",
                            key: "name",
                          },
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
