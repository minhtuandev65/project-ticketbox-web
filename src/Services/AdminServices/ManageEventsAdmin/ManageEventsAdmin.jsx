import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsAdmin extends BaseService {
  // PAGE QUAN LY SU KIEN ADMIN

  //   Duyệt danh sách sự kiện
  approveEvent = (eventId) => {
    return apiClient.put(`api/events/${eventId}/approve`, {});
  };

  // Từ chối sự kiện
  rejectEvent = (eventId) => {
    return apiClient.put(`api/events/${eventId}/cancel`, {});
  };

  // Lấy tất cả danh sách sự kiện
  getListEventsAll = (limit = 1000) => {
    return apiClient.get(`api/events/admin?limit=${limit}`, {});
  };
  // Lấy danh sách sự kiện hot
  getListEventsHot = () => {
    return apiClient.get(`api/events/hot-events`);
  };
  //   lấy danh sách sự kiện chi tiết
  getListDetailEvents = (eventId) => {
    return apiClient.get(`api/events/${eventId}/admin`);
  };
}
export const manageEventsAdmin = new ManageEventsAdmin();
