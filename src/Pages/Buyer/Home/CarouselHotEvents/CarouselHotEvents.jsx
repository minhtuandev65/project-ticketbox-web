import React, { useEffect } from "react";
import { Carousel, Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import styles from "./CarouselHotEvents.module.css";
import { getListEventsHotAction } from "../../../../Redux/actions/BuyerActions/ManageEventsAction/ManageEventsAction";
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const CarouselHotEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listEventsHot } = useSelector(
    (state) => state.ManageEventsBuyerReducer
  );

  useEffect(() => {
    dispatch(getListEventsHotAction());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: "40px 0",
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
      }}
    >
      <div
        style={{
          maxWidth: "1450px",
          margin: "0 auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        <Typography.Title level={2}>
        🔥Sự kiện được ưa thích
        </Typography.Title>
        <Carousel autoplay dots arrows>
          {chunkArray(listEventsHot, 2).map((group, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                {group.map((event) => (
                  <div
                    key={event._id}
                    style={{
                      width: "50%",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={event.bannerURL}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        display: "block",
                        cursor: "pointer !important",
                      }}
                      onClick={() =>
                        navigate(`/home/event-detail/${event._id}/detail`)
                      }
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        padding: "16px",
                        borderRadius: "10px",
                        color: "#000",
                        maxWidth: "80%",
                      }}
                    >
                      <Button
                        type="text"
                        className={styles["btn-register"]}
                        size="small"
                        onClick={() =>
                          navigate(`/home/event/detail/${event._id}`)
                        }
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
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
                {group.length === 1 && <div style={{ width: "50%" }} />}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselHotEvent;
