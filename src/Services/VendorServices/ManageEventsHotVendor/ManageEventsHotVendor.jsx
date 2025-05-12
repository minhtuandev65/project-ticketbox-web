import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsVendor extends BaseService {
  // PAGE quản lý sự kiện vendor
  //   Lấy danh sách sự kiện hot
  getListEventsHot = () => {
    return apiClient.get(`api/events/hot-events`, {});
  };
}
export const manageEventsVendor = new ManageEventsVendor();
