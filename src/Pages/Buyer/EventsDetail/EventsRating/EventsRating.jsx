import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRatingAction,
  createRatingAction,
  updateRatingAction,
} from "../../../../Redux/actions/BuyerActions/ManageRatingsAction/ManageRatingsAction";
import {
  Avatar,
  List,
  Rate,
  Typography,
  Input,
  Button,
  message,
  Card,
} from "antd";
import styles from "./EventsRating.module.css";
const { Text } = Typography;
const { TextArea } = Input;

export default function EventsRating({ eventId, userId }) {
  const dispatch = useDispatch();
  const ratingList = useSelector(
    (state) => state.ManageRatingsBuyerReducer.listRating
  );
  console.log(eventId);
  // Tìm đánh giá của user hiện tại (nếu có)
  const userRating = useMemo(() => {
    if (!userId || !Array.isArray(ratingList)) return null;
    return ratingList.find((item) => item.userId === userId) || null;
  }, [ratingList, userId]);

  // Nếu có đánh giá rồi thì dùng để khởi tạo form chỉnh sửa, nếu không thì để trống cho tạo mới
  const [ratingValue, setRatingValue] = useState(
    userRating ? userRating.rating : 0
  );
  const [commentValue, setCommentValue] = useState(
    userRating ? userRating.comment : ""
  );

  // Khi userRating thay đổi (do load mới) thì cập nhật lại state form
  useEffect(() => {
    if (userRating) {
      setRatingValue(userRating.rating);
      setCommentValue(userRating.comment);
    } else {
      setRatingValue(0);
      setCommentValue("");
    }
  }, [userRating]);

  useEffect(() => {
    if (eventId) {
      dispatch(getListRatingAction(eventId));
    }
  }, [dispatch, eventId]);

  const handleCreateComment = () => {
    if (!userId) {
      message.error("Bạn phải đăng nhập để đánh giá");
      return;
    }
    if (ratingValue === 0) {
      message.error("Vui lòng chọn số sao đánh giá");
      return;
    }
    const data = {
      userId,
      eventId,
      rating: ratingValue,
      comment: commentValue,
    };
    console.log(typeof data);
    dispatch(createRatingAction(data));
    // Reset form sau khi gửi
    setRatingValue(0);
    setCommentValue("");
  };

  const handleUpdateComment = () => {
    if (!userId) {
      message.error("Bạn phải đăng nhập để chỉnh sửa đánh giá");
      return;
    }
    if (ratingValue === 0) {
      message.error("Vui lòng chọn số sao đánh giá");
      return;
    }
    const data = {
      rating: ratingValue,
      comment: commentValue,
    };
    dispatch(updateRatingAction(userRating._id, data));
  };
  console.log("Reducer", ratingList);
  return (
    <Card
      variant="default"
      className={styles.formCard}
      bodyStyle={{ width: "100%" }}
    >
      <div style={{ marginTop: 32 }}>
        <h3>Đánh giá từ người tham gia</h3>
        {!ratingList || ratingList.length === 0 ? (
          <Text type="secondary">Chưa có đánh giá nào.</Text>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={Array.isArray(ratingList) ? ratingList : []}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.user?.avatar} />}
                  title={<Text strong>{item.user?.displayName}</Text>}
                  description={
                    <>
                      <Rate disabled defaultValue={item.rating} />
                      <div>{item.comment}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}

        {/* Form tạo hoặc chỉnh sửa đánh giá */}
        <div style={{ marginTop: 24 }}>
          <Text strong>
            {userRating
              ? "Chỉnh sửa đánh giá của bạn:"
              : "Đánh giá sự kiện này:"}
          </Text>
          <br />
          <Rate
            onChange={(value) => setRatingValue(value)}
            value={ratingValue}
            style={{ marginBottom: 12 }}
          />
          <TextArea
            rows={4}
            placeholder="Viết nhận xét của bạn..."
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <br />
          {userRating ? (
            <Button
              className={styles["btn-createRating"]}
              type="text"
              onClick={handleUpdateComment}
            >
              Cập nhật đánh giá
            </Button>
          ) : (
            <Button
              className={styles["btn-createRating"]}
              type="text"
              onClick={handleCreateComment}
            >
              Gửi đánh giá
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
