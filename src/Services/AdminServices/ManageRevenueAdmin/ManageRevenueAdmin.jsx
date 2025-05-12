import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class ManageRevenueAdmin extends BaseService {
  // PAGE XEM CAC BAO CAO ADMIN
  // Lấy danh sách các báo cáo doanh thu
  getListRevenue = (startTime, endTime) => {
    return apiClient.get(`api/reports/revenue`, {
      startTime,
      endTime,
    });
  };
}

export const manageRevenueAdmin = new ManageRevenueAdmin();
