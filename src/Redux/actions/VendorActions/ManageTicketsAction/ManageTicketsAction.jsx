import { message } from "antd";
import {
  SET_LIST_TICKET_SOLD,
  SET_LIST_TICKET_SOLD_BY_EVENT,
} from "../../../type/VendorType/Tickets/Tickets";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsVendor } from "../../../../Services/VendorServices/ManageTicketsVendor/ManageTicketsVendor";

// Xem thống kê vé bán được của vendor action
export const getListTicketSoldAction = (vendorId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsVendor.getListTicketSold(vendorId);
      dispatch({
        type: SET_LIST_TICKET_SOLD,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách vé bán được của vendor", error);
    }
  };
};
// Xem thống kê vé bán được của vendor theo sự kiện action
export const getListTicketSoldByEventAction = (eventId, vendorId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsVendor.getListTicketSoldByEvent(
        eventId,
        vendorId
      );
      dispatch({
        type: SET_LIST_TICKET_SOLD_BY_EVENT,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error(
        "Lỗi khi lấy danh sách vé bán được của vendor theo sự kiện",
        error
      );
    }
  };
};
