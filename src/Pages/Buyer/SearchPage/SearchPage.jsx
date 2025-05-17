import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SearchTextAction } from "../../../Redux/actions/BuyerActions/SearchAction/SearchAction";
import { Button, Card, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function SearchPage() {
  const dispatch = useDispatch();
  const { listSearch } = useSelector((state) => state.SearchReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  useEffect(() => {
    const queryFromUrl = searchParams.get("query");
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
      dispatch(SearchTextAction(queryFromUrl));
    }
  }, [dispatch, searchParams]);
  const handleSearch = () => {
    dispatch(SearchTextAction(searchQuery));
  };
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
  useEffect(() => {
    if (listSearch.length > 0) {
      setLoading(false);
    }
  }, [listSearch]);
  return (
    <div
      style={{
        padding: 40,
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Kết quả tìm kiếm
      </h2>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <LoadingOutlined style={{ fontSize: "40px" }} spin />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {listSearch.slice(0, visibleCount).map((result) => (
            <Col key={result._id} span={6}>
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
                    alt={result.title}
                    src={result.bannerURL}
                    style={{
                      height: 250,
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title={result.title}
                  description={
                    <div style={{ fontSize: 14, color: "#555" }}>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 14,
                          color: "#555",
                        }}
                      >
                        {result.description}
                      </div>
                      <div>
                        <strong>🗓 Thời gian:</strong> {result.date}
                      </div>
                      <div>
                        <strong>📍 Địa điểm:</strong> {result.location}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {listSearch.length > visibleCount && (
        <div ref={loader} style={{ textAlign: "center", marginTop: 20 }}>
          <Button type="primary" onClick={loadMore}>
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
