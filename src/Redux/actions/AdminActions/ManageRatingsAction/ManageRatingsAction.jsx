import { message } from "antd";
import {
  SET_GET_LIST_RATINGS,
  SET_REMOVE_RATINGS,
  SET_GET_LIST_RATINGS_REPORT,
} from "../../../type/AdminType/Ratings/Ratings";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageRatingAdmin } from "../../../../Services/AdminServices/ManageRatingAdmin/ManageRatingAdmin";

// Lấy danh sách các đánh giá action
export const getListRatingsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageRatingAdmin.getListRatings();
      dispatch({
        type: SET_GET_LIST_RATINGS,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách đánh giá!", error);
    }
  };
};

// Xoá đánh giá action
export const removeRatingAction = (ratingId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageRatingAdmin.removeRating(ratingId);
      dispatch({
        type: SET_REMOVE_RATINGS,
        payload: ratingId,
      });
      // Gọi lại danh sách đánh giá sau khi xoá
      dispatch(getListRatingsAction());
      dispatch(hideLoadingAction);
      message.success("Xoá đánh giá thành công!");
    } catch (error) {
      message.error("Lỗi khi xoá đánh giá!", error);
    }
  };
};

// Lấy danh sách báo cáo đánh giá action
export const getListRatingsReportAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageRatingAdmin.getListRatingReport();
      dispatch({
        type: SET_GET_LIST_RATINGS_REPORT,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách báo cáo đánh giá!", error);
    }
  };
};
