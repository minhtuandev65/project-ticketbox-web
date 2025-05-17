import React, { useEffect } from "react";
import { Carousel, Card, Row, Col, Typography, Space, Button } from "antd";
import { CalendarOutlined, DollarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListEventsAction } from "../../../../Redux/actions/BuyerActions/ManageEventsAction/ManageEventsAction";
import dayjs from "dayjs";
import styles from "./CarouselCategories.module.css";
const { Meta } = Card;
const { Title } = Typography;

// utility to split array into chunks
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const emojiMap = {
  ENTERTAINMENT: "🎤",
  TECHNOLOGY: "💻",
  EDUCATION: "🎓",
  MUSIC: "🎵",
  ACTIVISM: "✊",
  BUSINESS: "💼",
  CULTURE: "🎭",
  HEALTH: "❤️",
};
export default function CarouselCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listEvents } = useSelector((state) => state.ManageEventsBuyerReducer);

  useEffect(() => {
    dispatch(getListEventsAction());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: 40,
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
      }}
    >
      {listEvents.map((categoryData, idx) => {
        const events = Array.isArray(categoryData.events)
          ? categoryData.events
          : [];
        const groups = chunkArray(events, 3);

        return (
          <div
            key={categoryData.categories}
            style={{
              background: idx % 2 === 0 ? "#ffffff" : "#f5f5f5",
              borderRadius: 10,
              padding: 20,
              marginBottom: 50,
            }}
          >
            <Title
              key={categoryData.categories}
              level={3}
              style={{ marginBottom: 20 }}
            >
              {emojiMap[categoryData.categories] || "🔥"}{" "}
              {categoryData.categories}
            </Title>

            <Carousel arrows dots autoplay autoplaySpeed={3000}>
              {groups.map((group, index) => (
                <div key={index}>
                  <Row gutter={[16, 16]}>
                    {group.map((event) => (
                      <Col key={event._id} xs={24} sm={12} md={8}>
                        <div
                          style={{
                            overflow: "hidden",
                            borderRadius: 10,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Card
                            hoverable
                            style={{
                              borderRadius: 10,
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                            }}
                            cover={
                              <img
                                src={event.bannerURL}
                                alt={event.title}
                                style={{
                                  height: 200,
                                  objectFit: "cover",
                                  borderRadius: "10px 10px 0 0",
                                }}
                              />
                            }
                          >
                            <Meta
                              title={event.title}
                              description={
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {event.description}
                                </div>
                              }
                            />

                            <Space size="small" style={{ marginTop: 8 }}>
                              <CalendarOutlined />
                              <span>
                                {dayjs(event.date).format("DD/MM/YYYY HH:mm")}
                              </span>
                            </Space>
                            <br />
                            <Space size="small">
                              <DollarOutlined />
                              <span>
                                {event.isFree
                                  ? "Miễn phí"
                                  : event.price.toLocaleString() + "₫"}
                              </span>
                            </Space>

                            <div style={{ marginTop: "auto", paddingTop: 12 }}>
                              <Button
                                type="text"
                                block
                                className={styles["btn-carouselCategories"]}
                                style={{
                                  background: "#000",
                                  color: "#fff",
                                  border: "none",
                                  marginTop: 4,
                                  cursor: "pointer !important",
                                  width: 150,
                                  height: 50,
                                  borderRadius: 10,
                                }}
                                onClick={() =>
                                  navigate(`/home/event/detail/${event._id}`)
                                }
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                          </Card>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Carousel>
          </div>
        );
      })}
    </div>
  );
}
