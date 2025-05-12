import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import { manageUsersService } from "../../Services/ManageUsersService/ManageUsersService";
import PageLoadingSpinner from "../../Components/Loading/PageLoadingSpinner";
function AccountVerification() {
  const [searchParams] = useSearchParams();
  const { email, token } = Object.fromEntries([...searchParams]);

  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      setError(true);
      setVerifying(false);
      return;
    }

    const verify = async () => {
      try {
        await manageUsersService.verifyUser({
          email,
          token,
        });
        // const res = await manageUsersService.verifyUser({ email, token });
        message.success("Xác thực thành công! Đang chuyển hướng...");
        setVerified(true);
      } catch (err) {
        console.error("❌ Lỗi xác thực:", err.response?.data || err.message);
        message.error("Xác thực tài khoản không thành công!");
        setError(true);
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [email, token]);

  // ❌ Nếu thiếu param hoặc lỗi xác thực thì chuyển 404
  if (!email || !token || error) {
    return <Navigate to="/404" />;
  }

  // ⏳ Hiển thị khi đang xác thực
  if (verifying) {
    return <PageLoadingSpinner caption="Đang xác thực tài khoản..." />;
  }

  // ✅ Xác thực thành công, chuyển về trang login
  if (verified) {
    return <Navigate to={`/login`} />;
  }

  // Trường hợp fallback nếu không khớp điều kiện nào
  return null;
}

export default AccountVerification;
