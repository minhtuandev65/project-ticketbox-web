import { message } from "antd";
import {
  SET_GET_LIST_ALL_USERS,
  SET_GET_LIST_USERS_DETAIL,
  SET_BLOCK_USER,
  SET_UNLOCK_USER,
} from "../../../type/AdminType/User/User";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageUserAdmin } from "../../../../Services/AdminServices/ManageUserAdmin/ManageUserAdmin";

// Lấy danh sách người dùng action
export const getListAllUsersAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageUserAdmin.getListAllUsers();
      const user = result.data.users;
      dispatch({
        type: SET_GET_LIST_ALL_USERS,
        payload: user,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error(
        "Lỗi lấy danh sách người dùng, vui lòng thử lại sau!",
        error
      );
    }
  };
};

// Lấy danh sách người dùng chi tiết action
export const getListUsersDetailAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageUserAdmin.getListUsersDetail(userId);
      dispatch({
        type: SET_GET_LIST_USERS_DETAIL,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error(
        "Lỗi lấy danh sách người dùng chi tiết, vui lòng thử lại sau!",
        error
      );
    }
  };
};
// Chặn người dùng action
export const blockUserAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageUserAdmin.blockUser(userId);
      //   Lấy danh sách người dùng sau khi chặn
      dispatch(getListAllUsersAction());
      message.success("Chặn người dùng thành công!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi chặn người dùng, vui lòng thử lại sau!", error);
    }
  };
};
// Mở khóa người dùng action
export const unlockUserAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageUserAdmin.unlockUser(userId);
      //   Lấy danh sách người dùng sau khi mở khóa
      dispatch(getListAllUsersAction());
      message.success("Mở khóa người dùng thành công!");
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi mở khóa người dùng, vui lòng thử lại sau!", error);
    }
  };
};
