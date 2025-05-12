import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsVendor extends BaseService {
  // PAGE quản lý sự kiện vendor

  //   Xem thống kê vé bán được của vendor
  getListTicketSold = (vendorId) => {
    return apiClient.get(`api/events/${vendorId}/tickets`, {});
  };
  //   Xem thống kê vé bán được của vendor theo sự kiện
  getListTicketSoldByEvent = (eventId, vendorId) => {
    return apiClient.get(`api/events/${vendorId}/${eventId}/tickets`, {});
  };
}
export const manageEventsVendor = new ManageEventsVendor();
