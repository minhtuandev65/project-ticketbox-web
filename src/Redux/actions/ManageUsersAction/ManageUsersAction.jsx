import { message } from "antd";
import {
  SET_USER_LOGIN,
  SET_USER_REGISTER,
  SET_USER_VERIFY,
  SET_USER_PROFILE,
  SET_USER_LIST,
  SET_USER_INFO,
  SET_USER_ACCESS_AUTHORIZATION,
  SET_USER_LOGOUT,
} from "../../type/UsersType/UsersType";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../LoadingAction/LoadingAction";
import { manageUsersService } from "../../../Services/ManageUsersService/ManageUsersService";
import { USER_LOGIN } from "../../../utils/Setting/Config";

// Action đăng nhập người dùng
export const userLoginAction = (credentials, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const {
        data: { role: roleArray },
      } = await manageUsersService.getAccessAuthorization(credentials);
      const role = Array.isArray(roleArray) ? roleArray[0] : roleArray;
      const loginPayload = { ...credentials, role };
      const { data: userData } = await manageUsersService.userLogin(
        loginPayload
      );
      localStorage.setItem(
        USER_LOGIN,
        JSON.stringify({ email: credentials.email, role })
      );
      dispatch({
        type: SET_USER_LOGIN,
        payload: userData,
      });
      // Lấy thông tin người dùng
      dispatch(getUserInfoAction());
      // Bước 4: Kiểm tra role và điều hướng đến trang phù hợp
      if (role.includes("ADMIN")) {
        navigate("/admin");
      } else if (role.includes("VENDOR")) {
        navigate("/vendor");
      } else {
        navigate("/buyer/home");
      }

      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Đăng nhập thất bại: " + error.message);
      dispatch(hideLoadingAction);
    }
  };
};

// Người dùng đăng ký action
export const userRegisterAction = (registerProfile) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageUsersService.userRegister(registerProfile);
      dispatch(hideLoadingAction);
      message.success(
        "Đăng ký thành công, vui lòng kiểm tra địa chỉ email để xác thực tài khoản!"
      );
    } catch (error) {
      message.error("Đăng ký thất bại: " + error.message);
      dispatch(hideLoadingAction);
    }
  };
};
// Xác thực tài khoản action
export const userVerifyAction = (verifyProfile, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageUsersService.verifyUser(verifyProfile);
      navigate("/login");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Xác thực tài khoản thất bại: " + error.message);
      dispatch(hideLoadingAction);
    }
  };
};
// Quên mật khẩu action
export const userForgotPasswordAction = (email) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageUsersService.forgotPassword(email);
      message.success("Đã gửi email khôi phục mật khẩu!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Gửi email khôi phục mật khẩu thất bại: " + error.message);
      dispatch(hideLoadingAction);
    }
  };
};
// Đổi mật khẩu action
export const userChangePasswordAction = (password, token) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      console.log("Token action:", token);
      await manageUsersService.changePassword(password, token);
      message.success("Đổi mật khẩu thành công!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Đổi mật khẩu thất bại: " + error.message);
      dispatch(hideLoadingAction);
    }
  };
};
// Lấy thông tin người dùng action
export const getUserInfoAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageUsersService.getUserInfo();
      const userInfo = Array.isArray(result.data)
        ? result.data[0]
        : result.data;
      dispatch({
        type: SET_USER_PROFILE,
        payload: userInfo,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lấy thông tin người dùng thất bại: " + error.message);
      console.log("ERROR: ", error);
      dispatch(hideLoadingAction);
    }
  };
};
// Cập nhật thông tin người dùng action
export const updateUserInfoAction = (userInfo) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageUsersService.updateUserInfo(userInfo);
      // Cập nhật lại thông tin người dùng sau khi cập nhật
      dispatch(getUserInfoAction());
      message.success("Cập nhật thông tin thành công!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Cập nhật thông tin thất bại: " + error.message);
      dispatch(hideLoadingAction);
    }
  };
};
