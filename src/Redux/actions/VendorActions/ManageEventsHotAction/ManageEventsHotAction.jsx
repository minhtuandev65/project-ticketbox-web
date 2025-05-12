import { message } from "antd";
import { SET_LIST_EVENTS_HOT } from "../../../type/VendorType/EventsHot/EventsHot";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsVendor } from "../../../../Services/VendorServices/ManageEventsHotVendor/ManageEventsHotVendor";

export const getListEventsHotAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsVendor.getListEventsHot();
      dispatch({
        type: SET_LIST_EVENTS_HOT,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi hệ thống, vui lòng thử lại sau!", error);
    }
  };
};
