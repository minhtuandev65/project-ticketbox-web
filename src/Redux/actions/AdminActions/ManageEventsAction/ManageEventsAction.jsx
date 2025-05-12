import { message } from "antd";
import {
  SET_APPROVE_EVENT,
  SET_REJECT_EVENT,
  SET_LIST_EVENTS_ALL,
  SET_LIST_EVENTS_HOT,
  SET_LIST_DETAIL_EVENTS,
} from "../../../type/AdminType/Events/Events";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsAdmin } from "../../../../Services/AdminServices/ManageEventsAdmin/ManageEventsAdmin";
// Duyệt danh sách sự kiện action
export const approveEventAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsAdmin.approveEvent(eventId);
      dispatch({
        type: SET_APPROVE_EVENT,
        payload: result.data,
      });
      // Lấy lại danh sách sự kiện sau khi duyệt
      dispatch(getListEventsAllAction(1000));
      dispatch(hideLoadingAction);
      message.success("Duyệt sự kiện thành công!");
    } catch (error) {
      message.error("Duyệt sự kiện không thành công!", error);
    }
  };
};
// Từ chối sự kiện action
export const rejectEventAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsAdmin.rejectEvent(eventId);
      dispatch({
        type: SET_REJECT_EVENT,
        payload: result.data,
      });
      // Lấy lại danh sách sự kiện sau khi từ chối
      dispatch(getListEventsAllAction(1000));
      dispatch(hideLoadingAction);
      message.success("Từ chối sự kiện thành công!");
    } catch (error) {
      message.error("Từ chối sự kiện không thành công!", error);
    }
  };
};
// Lấy tất cả danh sách sự kiện action
export const getListEventsAllAction = (limit) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsAdmin.getListEventsAll(limit);
      dispatch({
        type: SET_LIST_EVENTS_ALL,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách sự kiện không thành công!", error);
    }
  };
};
// Lấy danh sách sự kiện hot action
export const getListEventsHotAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsAdmin.getListEventsHot();
      dispatch({
        type: SET_LIST_EVENTS_HOT,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách sự kiện hot không thành công!", error);
    }
  };
};
// Lấy danh sách sự kiện chi tiết action
export const getListDetailEventsAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsAdmin.getListDetailEvents(eventId);
      dispatch({
        type: SET_LIST_DETAIL_EVENTS,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách sự kiện chi tiết không thành công!", error);
    }
  };
};
