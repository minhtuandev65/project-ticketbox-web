import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageOrdersBuyer extends BaseService {
  // PAGE Quản lý đặt vé
  // Lấy tất cả danh sách order
  getListAllOrder = () => {
    return apiClient.get(`api/orders`, {});
  };
  getListStatusOrder = (status) => {
    return apiClient.get(`api/orders?status=${status}`, {});
  };
  getListOrderDetail = (orderId) => {
    return apiClient.get(`api/orders/${orderId}`);
  };
  //   Đặt vé
  createOrder = (data) => {
    return apiClient.post(`api/orders`, data);
  };
  // Thanh toán vé
  paymentOrder = (orderId, paymentMethod = "paypal") => {
    return apiClient.post(`api/orders/${orderId}/payment`, { paymentMethod });
  };
  // Hủy đặt vé
  cancelOrder = (orderId) => {
    return apiClient.put(`api/orders/${orderId}/cancel`);
  };
}
export const manageOrdersBuyer = new ManageOrdersBuyer();
