import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageOrdersBuyer extends BaseService {
  // PAGE Quản lý đặt vé

  //   Đặt vé
  createOrder = () => {
    return apiClient.post(`api/orders`, {});
  };
// Thanh toán vé
  paymentOrder = (orderId) => {
    return apiClient.post(`api/orders/${orderId}/payment`, {});
  };
}
export const manageOrdersBuyer = new ManageOrdersBuyer();
