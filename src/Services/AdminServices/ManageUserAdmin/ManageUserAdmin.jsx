import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class ManageUserAdmin extends BaseService {
  // PAGE QUAN LY NGUOI DUNG ADMIN
  // Lấy danh sách người dùng
  getListAllUsers = () => {
    return this.get(`api/users`, {});
  };
  //  Lấy danh sách người dùng chi tiết
  getListUsersDetail = (userId) => {
    return apiClient.get(`/api/users/${userId}/details`, {});
  };
  // chặn người dùng
  blockUser = (userId) => {
    return apiClient.put(`api/users/${userId}/lock`, {});
  };
  // mở khóa người dùng
  unlockUser = (userId) => {
    return apiClient.put(`api/users/${userId}/activate`, {});
  };
}

export const manageUserAdmin = new ManageUserAdmin();
