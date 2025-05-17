import styles from "./EventsBooking.module.css";
import { Card, Collapse, InputNumber, Button, Tag, Typography } from "antd";
import React, { useMemo } from "react";
import dayjs from "dayjs";
const { Panel } = Collapse;
const { Title, Text } = Typography;
function EventsBooking({
  showing,
  ticketQuantities,
  onQuantityChange,
  onPurchase,
  isBookingAllowed,
  event,
}) {
  // build các panel từ ticketTypes
  const items = (showing.ticketTypes || []).map((ticket) => ({
    key: ticket._id,
    label: (
      <div className={styles.panelHeader}>
        <span>🎫 {ticket.name} </span>
        <Tag color={ticket.status === "BOOK_NOW" ? "green" : "gray"}>
          {ticket.status === "BOOK_NOW" ? "Đang mở bán" : "Sắp mở bán"}
        </Tag>
      </div>
    ),
    children: (
      <div className={styles.panelContent}>
        <p>💰 Giá bán: {ticket.price.toLocaleString()}₫</p>
        💸 Giá gốc:{" "}
        <span style={{ textDecoration: "line-through", color: "gray" }}>
          {ticket.originalPrice.toLocaleString()}₫
        </span>
        <p>
          ⏰ {dayjs(ticket.startTime).format("DD/MM/YYYY HH:mm")} –{" "}
          {dayjs(ticket.endTime).format("DD/MM/YYYY HH:mm")}
        </p>
        <p>
          🎫 Tối thiểu {ticket.minQtyPerOrder} vé, Tối đa{" "}
          {ticket.maxQtyPerOrder} vé
        </p>
        <InputNumber
          min={ticket.minQtyPerOrder}
          max={ticket.maxQtyPerOrder}
          value={ticketQuantities[ticket._id] || 0}
          onChange={(value) => onQuantityChange(ticket._id, value)}
          style={{ width: 120 }}
        />
      </div>
    ),
  }));
  // Tính tổng thanh toán
  const totalAmount = useMemo(() => {
    return (showing.ticketTypes || []).reduce((sum, ticket) => {
      const qty = ticketQuantities[ticket._id] || 0;
      return sum + qty * ticket.price;
    }, 0);
  }, [showing.ticketTypes, ticketQuantities]);
  return (
    <Card
      variant="default"
      className={styles.formCard}
      bodyStyle={{ width: "100%" }}
    >
      <Title level={3}>Đặt vé ngay</Title>
      <Title level={5}>{dayjs(event.date).format("DD/MM/YYYY | HH:mm")}</Title>
      {items.length > 0 ? (
        <>
          <Collapse accordion items={items} />

          {/* Hiển thị tổng tiền khi đã chọn vé */}
          <div className={styles.totalAmount}>
            <Text strong>Tổng thanh toán: </Text>
            <Text style={{ fontSize: 16, color: "#1890ff" }}>
              {totalAmount.toLocaleString()}₫
            </Text>
          </div>
          <Button
            type="text"
            className={styles["btn-orderTicket"]}
            onClick={onPurchase}
            disabled={!isBookingAllowed}
            block
            style={{ marginTop: 16 }}
          >
            {isBookingAllowed ? "Đặt vé" : "Đã hết vé"}
          </Button>
        </>
      ) : (
        <p>Không có suất diễn nào.</p>
      )}
    </Card>
  );
}

export default EventsBooking;
