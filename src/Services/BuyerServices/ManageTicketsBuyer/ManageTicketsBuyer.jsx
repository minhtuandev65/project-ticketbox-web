import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageTicketsBuyer extends BaseService {
  // PAGE Quản lý vé

  //   Xem danh sách vé đã mua
  getMyListOrder = (buyerId) => {
    return apiClient.get(`api/tickets/user?buyer=${buyerId}`, {});
  };

  // Xem lịch sử giao dịch
  getMyListOrderHistory = (buyerId) => {
    return apiClient.get(`api/tickets/history?buyer=${buyerId}`, {});
  };
  // Hủy vé đã đặt
  cancelOrder = (orderId) => {
    return apiClient.put(`api/tickets/${orderId}/cancel`, {});
  };
}
export const manageTicketsBuyer = new ManageTicketsBuyer();
