import { message } from "antd";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import {
  SET_GET_MY_LIST_ORDER,
  SET_GET_MY_LIST_ORDER_STATUS,
  SET_GET_MY_LIST_ORDER_DETAIL,
} from "../../../type/BuyerType/Orders/Orders";
import { manageOrdersBuyer } from "../../../../Services/BuyerServices/ManageOrdersBuyer/ManageOrdersBuyer";
// Xem tất cả danh sách order action
export const getListAllOrderAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrdersBuyer.getListAllOrder();
      dispatch({
        type: SET_GET_MY_LIST_ORDER,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách đặt vé thất bại", error);
    }
  };
};
// Xem chi tiết một đơn đặt hàng action
export const getListStatusOrderAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrdersBuyer.getListStatusOrder();
      dispatch({
        type: SET_GET_MY_LIST_ORDER_STATUS,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách đặt vé thất bại", error);
    }
  };
};
// Xem chi tiết đơn đặt hàng
export const getListOrderDetailAction = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrdersBuyer.getListOrderDetail(orderId);
      console.log(result.data.data);
      dispatch({
        type: SET_GET_MY_LIST_ORDER_DETAIL,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy danh sách đặt hàng chi tiết thất bại", error);
    }
  };
};
// Đặt vé action
export const createOrderAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageOrdersBuyer.createOrder(data);

      dispatch(hideLoadingAction);
      message.success("Đặt vé thành công!");
    } catch (error) {
      message.error("Đặt vé thất bại!", error);
    }
  };
};
// Thanh toán vé action
export const paymentOrderAction = (orderId, paymentMethod) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageOrdersBuyer.paymentOrder(orderId, paymentMethod);
      dispatch(getListAllOrderAction());
      dispatch(hideLoadingAction);
      message.success("Thanh toán vé thành công!");
    } catch (error) {
      message.error("Thanh toán vé thất bại!", error);
    }
  };
};
// Hủy đặt vé
export const cancelOrderAction = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageOrdersBuyer.cancelOrder(orderId);
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Hủy vé thất bại", error);
    }
  };
};
