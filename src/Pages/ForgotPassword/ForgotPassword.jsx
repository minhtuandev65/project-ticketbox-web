import React from "react";
import { Input, Button, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { userForgotPasswordAction } from "../../Redux/actions/ManageUsersAction/ManageUsersAction";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "Vui lòng nhập email!";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(userForgotPasswordAction(values.email));
        message.success(
          "Đã gửi email khôi phục mật khẩu! Vui lòng kiểm tra hộp thư đến của bạn."
        );
        navigate(`/login`);
      } catch {
        // lỗi xử lý trong action
      }
    },
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #eafbf2, #d2f4e1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: 420,
          padding: "40px 32px",
          borderRadius: 16,
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title
          level={3}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          Quên Mật Khẩu
        </Typography.Title>

        {/* Email */}
        <div style={{ marginBottom: 24 }}>
          <Input
            name="email"
            placeholder="Nhập email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.email && formik.errors.email ? "error" : ""}
            style={{
              height: 48,
              borderRadius: 10,
              fontSize: 16,
              borderColor: "#ccc",
              padding: "0 12px",
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography.Text type="danger">
              {formik.errors.email}
            </Typography.Text>
          )}
        </div>

        {/* Submit */}
        <Button
          htmlType="submit"
          type="text"
          className={styles["btn-register"]}
          block
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            color: "white",
            height: 48,
            fontSize: 16,
            borderRadius: 10,
            fontWeight: "bold",
            border: "none",
          }}
        >
          Gửi Email Khôi Phục
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
