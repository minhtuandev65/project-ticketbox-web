import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageRatingsBuyer extends BaseService {
  // PAGE Quản lý đánh giá

  //   đánh giá sự kiện
  createRating = (data) => {
    return apiClient.post(`api/ratings`, data, {});
  };
  //   lấy danh sách đánh giá của người dùng
  getListRating = (eventId) => {
    return apiClient.get(`api/ratings/event/${eventId}`, {});
  };
  //   sửa đánh giá của người dùng
  updateRating = (ratingId, data) => {
    return apiClient.put(`api/ratings/${ratingId}`, data, {});
  };
}
export const manageRatingsBuyer = new ManageRatingsBuyer();
