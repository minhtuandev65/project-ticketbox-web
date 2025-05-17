import { message } from "antd";
import {
  SET_GET_LIST_ORGANIZATION,
  SET_ACTIVATE_ORGANIZATION,
  SET_REJECT_ORGANIZATION,
} from "../../../type/AdminType/Organization/Organization";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageOrganizationAdmin } from "../../../../Services/AdminServices/ManageOrganizationAdmin/ManageOrganizationAdmin";

// Lấy danh sách tổ chức action
export const getListOrganizationAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrganizationAdmin.getListOrganization();
      dispatch({
        type: SET_GET_LIST_ORGANIZATION,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách tổ chức!", error);
    }
  };
};
// Phê duyệt tổ chức action
export const activateOrganizationAction = (organizationId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrganizationAdmin.activateOrganization(
        organizationId
      );
      dispatch({
        type: SET_ACTIVATE_ORGANIZATION,
        payload: result.data,
      });
      message.success("Phê duyệt tổ chức thành công!");
      //   Lấy lai danh sách tổ chức sau khi phê duyệt
      dispatch(getListOrganizationAction());
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi phê duyệt tổ chức!", error);
    }
  };
};
// Từ chối tổ chức action
export const rejectOrganizationAction = (organizationId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrganizationAdmin.rejectOrganization(
        organizationId
      );
      dispatch({
        type: SET_REJECT_ORGANIZATION,
        payload: result.data,
      });
      message.success("Từ chối tổ chức thành công!");
      //   Lấy lai danh sách tổ chức sau khi từ chối
      dispatch(getListOrganizationAction());
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi khi từ chối tổ chức!", error);
    }
  };
};
