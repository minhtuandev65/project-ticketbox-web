import { message } from "antd";
import { SET_LIST_RATING } from "../../../type/VendorType/Ratings/Ratings";
import { ManageRatingsVendor } from "../../../../Services/VendorServices/ManageRatingsVendor/ManageRatingsVendor";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";

// Lấy danh sách đánh giá action
export const getListRatingAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await ManageRatingsVendor.getListRating();
      dispatch({
        type: SET_LIST_RATING,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error(
        "Có lỗi xảy ra trong quá trình lấy danh sách đánh giá!",
        error
      );
    }
  };
};
//  Phản hồi đánh giá action
export const replyRatingAction = (ratingId, data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await ManageRatingsVendor.replyRating(ratingId, data);
      message.success("Phản hồi đánh giá thành công!");
      // Gọi lại danh sách đánh giá sau khi phản hồi thành công
      dispatch(getListRatingAction());
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Có lỗi xảy ra trong quá trình phản hồi đánh giá!", error);
    }
  };
};
