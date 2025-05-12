import { message } from "antd";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageOrdersBuyer } from "../../../../Services/BuyerServices/ManageOrdersBuyer/ManageOrdersBuyer";

// Đặt vé action
export const createOrderAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageOrdersBuyer.createOrder();

      dispatch(hideLoadingAction);
      message.success("Đặt vé thành công!");
    } catch (error) {
      message.error("Đặt vé thất bại!", error);
    }
  };
};
// Thanh toán vé action
export const paymentOrderAction = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageOrdersBuyer.paymentOrder(orderId);

      dispatch(hideLoadingAction);
      message.success("Thanh toán vé thành công!");
    } catch (error) {
      message.error("Thanh toán vé thất bại!", error);
    }
  };
};
