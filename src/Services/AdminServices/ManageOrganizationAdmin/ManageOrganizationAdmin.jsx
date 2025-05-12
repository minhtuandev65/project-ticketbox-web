import apiClient from "../../BaseService/apiClient";
import { BaseService } from "../../BaseService/BaseService";

export class ManageOrganizationAdmin extends BaseService {
  // Lấy danh sách tổ chức
  getListOrganization = () => {
    return apiClient.get(`/api/organizations`);
  };
  // duyệt tổ chức
  activateOrganization = (eventId) => {
    return apiClient.put(`/api/organizations/${eventId}/activate`, {});
  };
  // từ chối tổ chức
  rejectOrganization = (eventId) => {
    return apiClient.put(`/api/organizations/${eventId}/reject`, {});
  };
}

export const manageOrganizationAdmin = new ManageOrganizationAdmin();
