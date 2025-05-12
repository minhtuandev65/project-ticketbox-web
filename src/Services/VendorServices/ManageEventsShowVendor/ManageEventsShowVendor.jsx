import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsVendor extends BaseService {
  // PAGE quản lý sự kiện vendor
  // Thêm mới show vào sự kiện
  createShow = (eventId, data) => {
    return apiClient.post(`api/events/${eventId}/showings`, data, {});
  };
  //   Lấy danh sách show của sự kiện
  getListShowEvents = (eventId) => {
    return apiClient.get(`api/events/${eventId}/showings`);
  };
}
export const manageEventsVendor = new ManageEventsVendor();
