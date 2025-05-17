import apiClient from "../../BaseService/apiClient";
import { BaseService } from "../../BaseService/BaseService";

export class ManageOrganizationAdmin extends BaseService {
  // Lấy danh sách tổ chức
  getListOrganization = () => {
    return apiClient.get(`/api/organizations`);
  };
  // duyệt tổ chức
  activateOrganization = (organizationId) => {
    return apiClient.put(`/api/organizations/${organizationId}/activate`, {});
  };
  // từ chối tổ chức
  rejectOrganization = (organizationId) => {
    return apiClient.put(`/api/organizations/${organizationId}/reject`, {});
  };
}

export const manageOrganizationAdmin = new ManageOrganizationAdmin();
