import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageEventsVendor extends BaseService {
  // PAGE quản lý sự kiện vendor

  //   Xem đánh giá sự kiện
  getListRating = () => {
    return apiClient.get(`api/events/vendor/ratings`, {});
  };
  //  Phản hồi đánh giá
  replyRating = (ratingId, data) => {
    return apiClient.put(`api/ratings/${ratingId}/reply`, {}, data);
  };
}
export const manageEventsVendor = new ManageEventsVendor();
