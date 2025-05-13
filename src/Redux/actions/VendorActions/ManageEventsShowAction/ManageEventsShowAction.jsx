import { message } from "antd";
import { SET_LIST_SHOW_EVENTS } from "../../../type/VendorType/EventsShow/EventsShow";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsVendor } from "../../../../Services/VendorServices/ManageEventsShowVendor/ManageEventsShowVendor";

// Thêm mới show vào sự kiện action
export const createShowAction = (eventId, data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageEventsVendor.createShow(eventId, data);
      dispatch(hideLoadingAction);
      message.success("Thêm mới show thành công!");
    } catch (error) {
      message.error("Thêm mới show thất bại!", error);
    }
  };
};
