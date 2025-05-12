import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class ManageRatingAdmin extends BaseService {
  // PAGE QUAN LY DANH GIA ADMIN

  // Lấy danh sách các đánh giá
  getListRatings = () => {
    return apiClient.get("api/ratings");
  };
  // xóa đánh giá
  removeRating = (ratingId) => {
    return apiClient.delete(`/api/ratings/${ratingId}`, {});
  };
  // Xem báo cáo đánh giá
  getListRatingReport = () => {
    return apiClient.get(`/api/reports/ratings`);
  };
}
export const manageRatingAdmin = new ManageRatingAdmin();
