import { message } from "antd";
import { SET_GET_ORGANIZATION } from "../../../type/VendorType/Organization/OrganizationType";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { manageOrganizationVendor } from "../../../../Services/VendorServices/ManageOrganizationVendor/ManageOrganizationVendor";

// Lấy danh sách tổ chức của tui
export const getMyOrganizationAction = (vendorId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageOrganizationVendor.getMyOrganization(vendorId);
      dispatch({
        type: SET_GET_ORGANIZATION,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi lấy tổ chức!", error);
    }
  };
};
// Tạo tổ chức action
export const createOrganizationAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await manageOrganizationVendor.createOrganization(data);
      dispatch(getMyOrganizationAction());
      dispatch(hideLoadingAction);
      message.success("Tạo tổ chức thành công!");
    } catch (error) {
      message.error("Tạo tổ chức thất bại!", error);
    }
  };
};
