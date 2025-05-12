import { message } from "antd";
import { SET_GET_LIST_RATING } from "../../../type/BuyerType/Ratings/Ratings";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageRatingsBuyer } from "../../../../Services/BuyerServices/ManageRatingsBuyer/ManageRatingsBuyer";

// Lấy danh sách đánh giá của người dùng action
export const getListRatingAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageRatingsBuyer.getListRating(eventId);
      dispatch({
        type: SET_GET_LIST_RATING,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách đánh giá thất bại!", error);
    }
  };
};
// Tạo đánh giá của người dùng action
export const createRatingAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageRatingsBuyer.createRating(data);
      message.success("Tạo đánh giá thành công!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Tạo đánh giá thất bại!", error);
    }
  };
};
// Cập nhật đánh giá của người dùng action
export const updateRatingAction = (ratingId, data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageRatingsBuyer.updateRating(ratingId, data);
      message.success("Cập nhật đánh giá thành công!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Cập nhật đánh giá thất bại!", error);
    }
  };
};
