import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class ManageOrganizationVendor extends BaseService {
  // PAGE tạo tổ chức
  //   Tạo tổ chức
  createOrganization = (data) => {
    return apiClient.post(`api/organizations`, data, {});
  };
  getMyOrganization = (vendorId) => {
    return apiClient.get(`api/organizations/${vendorId}`);
  };
}
export const manageOrganizationVendor = new ManageOrganizationVendor();
