import { message } from "antd";
import {
  SET_LIST_EVENTS,
  SET_LIST_DETAIL_EVENTS,
  SET_ONE_DETAIL_EVENT,
} from "../../../type/VendorType/Events/Events";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsVendor } from "../../../../Services/VendorServices/ManageEventsVendor/ManageEventsVendor";
// Lấy danh sách các sự kiện
// Lấy danh sách sự kiện của vendor
export const getListEventsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsVendor.getListEvents();
      dispatch({
        type: SET_LIST_EVENTS,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      message.error("Lấy danh sách sự kiện thất bại!", error);
    }
  };
};
// Lấy chi tiết một sự kiện của vendor
export const getOneDetailEventAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsVendor.getOneDetailEvent(eventId);
      dispatch({
        type: SET_ONE_DETAIL_EVENT,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      message.error("Lấy chi tiết sự kiện thất bại!", error);
    }
  };
};
// Tạo sự kiện action
export const createEventsAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageEventsVendor.createEvents(data);
      //   Lấy danh sách sự kiện của vendor sau khi tạo sự kiện thành công
      dispatch(getListEventsAction());
      dispatch(hideLoadingAction);
      message.success("Tạo sự kiện thành công!");
    } catch (error) {
      message.error("Tạo sự kiện thất bại!", error);
    }
  };
};
// Chỉnh sửa sự kiện action
export const updateEventAction = (eventId, data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageEventsVendor.updateEvent(eventId, data);
      //   Lấy danh sách sự kiện của vendor sau khi tạo sự kiện thành công
      dispatch(getListEventsAction());
      dispatch(hideLoadingAction);
      message.success("Chỉnh sửa sự kiện thành công!");
    } catch (error) {
      dispatch(hideLoadingAction);
      message.error("Chỉnh sửa sự kiện thất bại!", error);
    }
  };
};
// Hủy sự kiện action
export const cancelEventAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageEventsVendor.cancelEvent(eventId);
      //   Lấy danh sách sự kiện của vendor sau khi tạo sự kiện thành công
      dispatch(getListEventsAction());
      dispatch(hideLoadingAction);
      message.success("Hủy sự kiện thành công!");
    } catch (error) {
      dispatch(hideLoadingAction);
      message.error("Hủy sự kiện thất bại!", error);
    }
  };
};
