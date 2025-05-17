import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageTicketsBuyer extends BaseService {
  // PAGE Quản lý vé

  //   Xem danh sách vé đã mua
  getMyListTicket = (buyerId) => {
    return apiClient.get(`api/tickets/user?buyer=${buyerId}`, {});
  };

  // Xem lịch sử giao dịch
  getMyListOrderHistory = () => {
    return apiClient.get(`api/tickets/history`, {});
  };
  // Hủy vé đã đặt
  cancelTicket = (ticketId) => {
    return apiClient.put(`api/tickets/${ticketId}/cancel`, {});
  };
}
export const manageTicketsBuyer = new ManageTicketsBuyer();
