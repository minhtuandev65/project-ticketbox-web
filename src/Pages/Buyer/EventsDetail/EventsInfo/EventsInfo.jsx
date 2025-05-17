// EventsInfo.jsx
import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Tag } from "antd";
import dayjs from "dayjs";
import styles from "./Eventsinfo.module.css";

const { Title, Paragraph } = Typography;

export function EventsInfo({ event, organization }) {
  const [showFullCard, setShowFullCard] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const descRef = React.useRef(null);

  useEffect(() => {
    if (descRef.current && descRef.current.scrollHeight > 400) {
      setShowToggleButton(true);
    }
  }, [event]);

  return (
    <Card
      variant="default"
      className={styles.infoCard}
    >
      <div style={{ borderBottom: "1px solid black", marginBottom: "8px" }}>
        <Title level={4}>
          Giới thiệu
        </Title>
      </div>
      <div style={{ position: "relative" }}>
        <div
          ref={descRef}
          style={{
            maxHeight: showFullCard ? "none" : 300,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <Title
            style={{
              textAlign: "center",
              fontWeight: 750,
            }}
            level={2}
          >
            {event.title}
          </Title>
          <Paragraph>{event.description}</Paragraph>
          <Title level={4}>Thông tin sự kiện</Title>
          <ul className={styles.infoList}>
            <li>
              <strong>Thời gian dự kiến:</strong>{" "}
              {dayjs(event.date).format("HH:mm | DD/MM/YYYY ")}
            </li>
            <li>
              <strong>Địa điểm:</strong> {event.location}
            </li>
            <li>
              <strong>Giá vé:</strong>{" "}
              {event.isFree ? "Miễn phí" : event.price.toLocaleString() + "₫"}
            </li>
            <li>
              <strong>Vé còn lại:</strong> {event.availableTickets}/
              {event.totalTickets}
            </li>
          </ul>
          <Title level={4}>Thông tin tổ chức</Title>
          <ul className={styles.infoList}>
            <li>
              <strong>Ngày tạo tổ chức: </strong>{" "}
              {organization?.createdAt
                ? dayjs(organization.createdAt).format("HH:mm | DD/MM/YYYY")
                : "Đang cập nhật"}
            </li>
            <li>
              <strong>Tên tổ chức: </strong> {organization.name}
            </li>
            <li>
              <strong>Mô tả: </strong> {organization.description}
            </li>
            <li>
              <strong>Địa chỉ email: </strong> {organization.contactEmail}
            </li>
            <li>
              <strong>Số điện thoại: </strong> {organization.contactPhone}
            </li>
            <li>
              <strong>Địa chỉ tổ chức: </strong> {organization.address}
            </li>
            <li>
              <strong>Trạng thái: </strong>{" "}
              <Tag
                color={
                  organization.status === "APPROVED"
                    ? "green"
                    : organization.status === "PENDING"
                    ? "orange"
                    : "red"
                }
              >
                {organization.status === "APPROVED"
                  ? "Đã duyệt"
                  : organization.status === "PENDING"
                  ? "Chờ duyệt"
                  : "Bị từ chối"}
              </Tag>{" "}
              <strong>tổ chức</strong>
            </li>
          </ul>
        </div>
        {/* Lớp mờ ở dưới */}
        {!showFullCard && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 60,
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {showToggleButton && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button
            className={styles["btn-viewMore"]}
            type="link"
            onClick={() => setShowFullCard(!showFullCard)}
            style={{
              color: "black",
            }}
          >
            {showFullCard ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      )}
    </Card>
  );
}
