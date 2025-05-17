import React, { useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Collapse, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { EventsBanner } from "../EventsBanner/EventsBanner";
import { EventsInfo } from "../EventsInfo/EventsInfo";
import EventsRating from "../EventsRating/EventsRating";
import { getListDetailEventsAction } from "../../../../Redux/actions/BuyerActions/ManageEventsAction/ManageEventsAction";
import { createOrderAction } from "../../../../Redux/actions/BuyerActions/ManageOrdersAction/ManageOrdersAction";

import styles from "./EventDetailUserPage.module.css";
import EventsBooking from "../EventsBooking/EventsBooking";
const { Panel } = Collapse;

export default function EventDetailPage() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const detail = useSelector(
    (state) => state.ManageEventsBuyerReducer.listDetailEvents
  );
  const user = useSelector((state) => state.ManageUsersReducer.userProfile);
  const event = useMemo(() => detail || {}, [detail]);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const bookingRef = useRef();
  useEffect(() => {
    if (eventId) dispatch(getListDetailEventsAction(eventId));
  }, [dispatch, eventId]);

  const handleTicketQuantityChange = (ticketTypeId, value) => {
    setTicketQuantities((prev) => ({ ...prev, [ticketTypeId]: value }));
  };

  const handlePurchase = () => {
    // Lọc ra những loại vé có số lượng > 0
    const selected = Object.entries(ticketQuantities)
      .filter(([, qty]) => qty > 0)
      .map(([ticketTypeId, quantity]) => ({ ticketTypeId, quantity }));

    if (selected.length === 0) {
      return message.warning("Vui lòng chọn ít nhất một loại vé.");
    }

    // Giả sử chỉ có một showing đầu tiên
    const showingId = event.showings?.[0]?._id;
    if (!showingId) {
      return message.error("Không tìm thấy suất diễn để đặt vé.");
    }

    // Gửi từng loại vé một
    selected.forEach(({ ticketTypeId, quantity }) => {
      dispatch(
        createOrderAction({
          eventId: event._id,
          showingId,
          ticketTypeId,
          quantity,
        })
      );
      navigate("/home/order");
    });
  };
  const scrollToBooking = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
      message.info("Vui lòng chọn loại vé.");
    }
  };
  if (!event || !event._id) {
    return <div>Đang tải dữ liệu sự kiện...</div>;
  }

  // assume only first showing for simplicity
  const showing = event.showings?.[0] || {};

  return (
    <div className={styles.container}>
      <EventsBanner
        city={event.city}
        title={event.title}
        date={event.date}
        location={event.location}
        fullAddress={event.fullAddress}
        priceLabel={
          event.isFree ? "Miễn phí" : event.price.toLocaleString() + "₫"
        }
        isBookingAllowed={event.isBookingAllowed}
        bannerURL={event.bannerURL}
        onPurchase={scrollToBooking}
      />

      <Row gutter={[32, 32]} className={styles.mainRow}>
        <Col xs={24}>
          <EventsInfo event={event} organization={event.organization} />
        </Col>

        <Col xs={24} ref={bookingRef}>
          <EventsBooking
            showing={showing}
            event={event}
            ticketQuantities={ticketQuantities}
            onQuantityChange={handleTicketQuantityChange}
            onPurchase={handlePurchase}
            isBookingAllowed={event.isBookingAllowed}
          />
        </Col>

        <Col xs={24}>
          <EventsRating eventId={String(event._id)} userId={String(user._id)} />
        </Col>
      </Row>
    </div>
  );
}
