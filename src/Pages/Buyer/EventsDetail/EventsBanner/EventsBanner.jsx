// EventsBanner.jsx
import React from "react";
import { Button, Typography } from "antd";
import dayjs from "dayjs";
import styles from "./EventsBanner.module.css";

const { Title } = Typography;

export function EventsBanner({
  city,
  title,
  date,
  location,
  fullAddress,
  priceLabel,
  onPurchase,
  isBookingAllowed,
  bannerURL,
}) {
  return (
    <div className={styles.ticketContainer}>
      <div className={styles.ticketLeft}>
        <Title level={4} className={styles.eventTitle}>
          [{city}] {title}
        </Title>
        <p>
          <i className="fa-regular fa-clock" /> {dayjs(date).format("HH:mm")} |{" "}
          {dayjs(date).format("DD MMMM, YYYY")}
        </p>
        <p>
          <i className="fa-solid fa-location-dot" /> {location}
        </p>
        <p className={styles.address}>{fullAddress}</p>

        <div className={styles.divider} />
        <p>
          Giá từ <span className={styles.price}>{priceLabel}</span>
        </p>

        <Button
          type="primary"
          className={styles.buyButton}
          onClick={onPurchase}
          disabled={!isBookingAllowed}
        >
          {isBookingAllowed ? "Mua vé ngay" : "Đã hết vé"}
        </Button>
      </div>

      <div
        className={styles.ticketRight}
        style={{ backgroundImage: `url(${bannerURL})` }}
      />
    </div>
  );
}
