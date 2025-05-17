import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsBuyer extends BaseService {
  // PAGE Quản lý sự kiện

  //   Xem sự kiện
  getListEvents = () => {
    return apiClient.get(`api/reports/data-layout`, {});
  };
  // Xem sự kiện hot
  getListEventsHot = () => {
    return apiClient.get(`api/events/hot-events`);
  };
  //   Lấy danh sách sự kiện chi tiết
  getListDetailEvents = (eventId) => {
    return apiClient.get(`api/events/${eventId}/detail`);
  };
  // Lấy danh sách search
  getCityCardList = (url) => {
    return apiClient.get(url);
  };
}
export const manageEventsBuyer = new ManageEventsBuyer();
