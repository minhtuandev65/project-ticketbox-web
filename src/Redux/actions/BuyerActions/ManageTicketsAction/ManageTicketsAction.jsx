import { message } from "antd";
import {
  SET_GET_MY_LIST_TICKET,
  SET_GET_MY_LIST_TICKET_HISTORY,
} from "../../../type/BuyerType/Tickets/Tickets";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageTicketsBuyer } from "../../../../Services/BuyerServices/ManageTicketsBuyer/ManageTicketsBuyer";

// Xanh danh sách vé đã đặt action
export const getMyListTicketAction = (buyerId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageTicketsBuyer.getMyListTicket(buyerId);
      dispatch({
        typeo: SET_GET_MY_LIST_TICKET,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách vé đã đặt thất bại!", error);
    }
  };
};
// Xem
// Xem lịch sử giao dịch action
export const getMyListTicketHistoryAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageTicketsBuyer.getMyListTicketHistory();
      dispatch({
        type: SET_GET_MY_LIST_TICKET_HISTORY,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy lịch sử giao dịch thất bại!", error);
    }
  };
};
// Hủy vé đã đặt action
export const cancelTicketAction = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageTicketsBuyer.cancelTicket(orderId);
      dispatch(hideLoadingAction);
      message.success("Hủy vé thành công!");
    } catch (error) {
      message.error("Hủy vé thất bại!", error);
    }
  };
};
