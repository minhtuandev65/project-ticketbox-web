// src/components/CityCardList.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Row, Col, Select, Typography, Space } from "antd";
import { CalendarOutlined, DollarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCityCardListAction } from "../../../../../Redux/actions/BuyerActions/ManageEventsAction/ManageEventsAction";
import dayjs from "dayjs";

const { Option } = Select;
const { Meta } = Card;
const { Text } = Typography;

const CityCardList = () => {
  const dispatch = useDispatch();
  const { arrCardList } = useSelector(
    (state) => state.ManageEventsBuyerReducer
  );
  const [filteredCity, setFilteredCity] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const loader = useRef(null);

  useEffect(() => {
    const url = filteredCity ? `api/events?city=${filteredCity}` : `api/events`;
    dispatch(getCityCardListAction(url));
  }, [dispatch, filteredCity]);

  const handleFilterChange = (values) => {
    if (values.includes("Other")) {
      setFilteredCity("");
    } else {
      setFilteredCity(values.join(","));
    }
    setVisibleCount(8);
  };

  const filteredCards = Array.isArray(arrCardList) ? arrCardList : [];

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 4);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    if (loader.current) obs.observe(loader.current);
    return () => loader.current && obs.unobserve(loader.current);
  }, [loadMore]);

  const cities = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Lạt", "Other"];

  return (
    <div
      style={{
        padding: 40,
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          display: "block",
        }}
      >
        Danh sách sự kiện
      </Text>

      <Select
        mode="multiple"
        placeholder="Chọn thành phố lọc"
        style={{ width: 240, marginBottom: 20 }}
        onChange={handleFilterChange}
        value={filteredCity ? filteredCity.split(",") : []}
        allowClear
      >
        {cities.map((city) => (
          <Option key={city} value={city}>
            {city}
          </Option>
        ))}
      </Select>

      <Row gutter={[16, 16]}>
        {filteredCards.slice(0, visibleCount).map((card) => (
          <Col key={card._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ transition: "transform .3s", borderRadius: 10 }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              cover={
                <img
                  alt={card.title}
                  src={card.bannerURL}
                  style={{
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              }
            >
              <Meta
                title={card.title}
                description={
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: 8,
                    }}
                  >
                    {card.description}
                  </div>
                }
              />
              <Space size="small">
                <CalendarOutlined />{" "}
                <Text>{dayjs(card.date).format("DD/MM/YYYY HH:mm")}</Text>
              </Space>
              <br />
              <Space size="small">
                <DollarOutlined />{" "}
                <Text>
                  {card.isFree ? "Miễn phí" : card.price.toLocaleString() + "₫"}
                </Text>
              </Space>
              <br />
              <Space size="small">
                <Text>📍 {card.city}</Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <div ref={loader} style={{ height: 1 }} />
    </div>
  );
};

export default CityCardList;
