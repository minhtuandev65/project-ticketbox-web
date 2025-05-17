import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getListCityAction } from "../../../../../Redux/actions/BuyerActions/ManageEventsAction/ManageEventsAction";

const CityCardHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listCity } = useSelector((state) => state.ManageEventsBuyerReducer);

  useEffect(() => {
    dispatch(getListCityAction());
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
          maxWidth: "1500px",
          margin: "0 auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}
        >
          Điểm đến thú vị
        </h2>

        <Row gutter={[16, 16]}>
          {Array.isArray(listCity) &&
            listCity.slice(0, 4).map((cityCard, index) => {
              return (
                <Col key={cityCard.city || index} span={6}>
                  <Link
                    to={`/home/city-list?city=${encodeURIComponent(
                      JSON.stringify(cityCard)
                    )}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      hoverable
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease-in-out",
                        overflow: "hidden",
                      }}
                      cover={
                        <div style={{ position: "relative", height: "350px" }}>
                          <img
                            alt={cityCard.city}
                            src={cityCard.cityBgURL}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "10px",
                              zIndex: 1,
                              transition: "all 0.3s ease-in-out",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: "20px",
                              background:
                                "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                              color: "#fff",
                              zIndex: 2,
                            }}
                          >
                            <h3
                              style={{
                                marginBottom: 4,
                                fontSize: "18px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {cityCard.city}
                            </h3>
                            <p
                              style={{
                                fontSize: "12px",
                                marginBottom: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {cityCard.description}
                            </p>
                          </div>
                        </div>
                      }
                    />
                  </Link>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default CityCardHome;
