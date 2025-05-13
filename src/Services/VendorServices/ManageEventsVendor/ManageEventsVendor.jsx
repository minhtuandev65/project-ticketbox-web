import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsVendor extends BaseService {
  // PAGE quản lý sự kiện vendor
  //   Tạo sự kiện
  createEvents = (data) => {
    return apiClient.post(`api/events`, data, {});
  };
  //    Xem danh sách sự kiện của mình
  getListEvents = () => {
    return apiClient.get(`api/events/vendor`, {});
  };
  //   Chỉnh sửa sự kiện
  updateEvent = (eventId, data) => {
    return apiClient.put(`api/events/${eventId}/update`, data, {});
  };
  //   hủy sự kiện
  cancelEvent = (eventId) => {
    return apiClient.put(`api/events/${eventId}/vendor/cancel`, {});
  };
  //   Lấy danh sách sự kiện chi tiết
  getListDetailEvents = (eventId) => {
    return apiClient.get(`api/events/${eventId}/detail`);
  };
  //   Xem chi tiết một sự kiện
  getOneDetailEvent = (eventId) => {
    return apiClient.get(`api/events/${eventId}/vendor`, {});
  };
}
export const manageEventsVendor = new ManageEventsVendor();
