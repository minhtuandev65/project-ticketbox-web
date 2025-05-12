import { message } from "antd";
import { SET_GET_LIST_REVENUE } from "../../../type/AdminType/Revenue/Revenue";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageRevenueAdmin } from "../../../../Services/AdminServices/ManageRevenueAdmin/ManageRevenueAdmin";

// Lấy danh sách báo cáo doanh thu action
export const getListRevenueAction = (startTime, endTime) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageRevenueAdmin.getListRevenue(
        startTime,
        endTime
      );
      dispatch({
        type: SET_GET_LIST_REVENUE,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách báo cáo doanh thu!", error);
    }
  };
};
