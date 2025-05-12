import { message } from "antd";
import {
  SET_GET_MY_LIST_ORDER,
  SET_GET_MY_LIST_ORDER_HISTORY,
} from "../../../type/BuyerType/Tickets/Tickets";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageTicketsBuyer } from "../../../../Services/BuyerServices/ManageTicketsBuyer/ManageTicketsBuyer";

// Xanh danh sách vé đã đặt action
export const getMyListOrderAction = (buyerId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageTicketsBuyer.getMyListOrder(buyerId);
      dispatch({
        typeo: SET_GET_MY_LIST_ORDER,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách vé đã đặt thất bại!", error);
    }
  };
};
// Xem lịch sử giao dịch action
export const getMyListOrderHistoryAction = (buyerId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageTicketsBuyer.getMyListOrderHistory(buyerId);
      dispatch({
        type: SET_GET_MY_LIST_ORDER_HISTORY,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy lịch sử giao dịch thất bại!", error);
    }
  };
};
// Hủy vé đã đặt action
export const cancelOrderAction = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageTicketsBuyer.cancelOrder(orderId);
      dispatch(hideLoadingAction);
      message.success("Hủy vé thành công!");
    } catch (error) {
      message.error("Hủy vé thất bại!", error);
    }
  };
};
