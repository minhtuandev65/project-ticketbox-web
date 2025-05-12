import { message } from "antd";
import { SET_LIST_SHOW_EVENTS } from "../../../type/VendorType/EventsShow/EventsShow";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsVendor } from "../../../../Services/VendorServices/ManageEventsShowVendor/ManageEventsShowVendor";
// Lấy danh sách show của sự kiện
export const getListShowEventsAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsVendor.getListShowEvents(eventId);
      dispatch({
        type: SET_LIST_SHOW_EVENTS,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách show thất bại!", error);
    }
  };
};
// Thêm mới show vào sự kiện action
export const createShowAction = (eventId, data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageEventsVendor.createShow(eventId, data);
      //   lấy lại danh sách show của sự kiện sau khi thêm mới thành công
      dispatch(getListShowEventsAction(eventId));
      dispatch(hideLoadingAction);
      message.success("Thêm mới show thành công!");
    } catch (error) {
      message.error("Thêm mới show thất bại!", error);
    }
  };
};
