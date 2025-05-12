import apiClient from "../BaseService/apiClient";
import { BaseService } from "../BaseService/BaseService";

class ManageUsersService extends BaseService {
  constructor() {
    super();
  }

  // User đăng nhập api
  userLogin = (loginProfile) => {
    return apiClient.post("api/users/authenticate", loginProfile);
  };
  // User đăng ký api
  userRegister = (registerProfile) => {
    return apiClient.post("api/users/register", registerProfile);
  };
  //   // Xác thực tài khoản api
  verifyUser = (verifyProfile) => {
    return apiClient.post("api/users/verify", verifyProfile);
  };
  // Xem thông tin người dùng
  getUserInfo = () => {
    return apiClient.get(`api/users/me`, {});
  };
  // Đăng xuất người dùng
  userLogout = () => {
    return apiClient.post("api/users/logout");
  };
  // quên mật khẩu
  forgotPassword = (email) => {
    return apiClient.post("api/users/forgot_password", { email });
  };
  // Đổi mật khẩu
  changePassword = (password, token) => {
    return apiClient.post(`api/users/reset_password?token=${token}`, {
      password,
    });
  };
  // Phân quyền người dùng
  getAccessAuthorization = (data) => {
    return apiClient.post("api/users/access_authorization", data);
  };
  // Cập nhật thông tin người dùng
  updateUserInfo = (userInfo) => {
    return apiClient.put("api/users/update", userInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
export const manageUsersService = new ManageUsersService();
