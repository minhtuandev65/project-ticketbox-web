import axios from "axios";
import { DOMAIN, TOKEN } from "../../Utils/Setting/Config";

const apiClient = axios.create({
  baseURL: DOMAIN,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu access token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Ngăn chặn gọi refresh token trùng lặp
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await apiClient.get("api/users/refresh_token");
          const newToken = data.accessToken;
          localStorage.setItem(TOKEN, newToken);

          // Gắn token mới vào request cũ rồi gửi lại
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Nếu refresh token cũng hết hạn → gọi logout
          console.error("Refresh token hết hạn:", refreshError);
          isRefreshing = false;

          try {
            await apiClient.post("api/users/logout");
          } catch (logoutErr) {
            console.warn("Logout lỗi:", logoutErr);
          }

          // Clear token và redirect về login (tùy ứng dụng bạn xử lý router)
          localStorage.removeItem(TOKEN);
          window.location.href = "/login"; // hoặc dùng navigate("/login") nếu dùng React Router

          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
