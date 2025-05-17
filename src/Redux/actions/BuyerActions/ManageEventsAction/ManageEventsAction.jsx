import { message } from "antd";
import {
  SET_GET_LIST_EVENTS,
  SET_GET_LIST_EVENTS_HOT,
  SET_GET_LIST_DETAIL_EVENTS,
  SET_GET_LIST_CITY,
  SET_CARD_LIST,
} from "../../../type/BuyerType/Events/Events";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageEventsBuyer } from "../../../../Services/BuyerServices/ManageEventsBuyer/ManageEventsBuyer";

// Lấy danh sach sự kiện action
export const getListEventsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsBuyer.getListEvents();
      dispatch({
        type: SET_GET_LIST_EVENTS,
        payload: result.data.dataEvents,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách sự kiện!", error);
    }
  };
};
// Lấy danh sach sự kiện action
export const getListCityAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsBuyer.getListEvents();
      dispatch({
        type: SET_GET_LIST_CITY,
        payload: result.data.cityData,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách thành phố!", error);
    }
  };
};
// Lấy danh sach sự kiện hot action
export const getListEventsHotAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsBuyer.getListEventsHot();
      dispatch({
        type: SET_GET_LIST_EVENTS_HOT,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách sự kiện hot!", error);
    }
  };
};
// Lấy danh sach sự kiện chi tiết action
export const getListDetailEventsAction = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageEventsBuyer.getListDetailEvents(eventId);
      dispatch({
        type: SET_GET_LIST_DETAIL_EVENTS,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách sự kiện chi tiết!", error);
    }
  };
};

export const getCityCardListAction = (url) => {
  return async (dispatch) => {
    try {
      const res = await manageEventsBuyer.getCityCardList(url);
      console.log("Data city list action", res.data.data.data);
      dispatch({
        type: SET_CARD_LIST,
        payload: res.data.data.data,
      });
    } catch (error) {
      message.error("Lỗi lấy danh sách sự kiện", error);
    }
  };
};
