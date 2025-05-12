// src/pages/ResetPassword/ChangeYourPassword.jsx
import React from "react";
import { Input, Button, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userChangePasswordAction } from "../../Redux/actions/ManageUsersAction/ManageUsersAction";
import styles from "./ChangePassword.module.css";
import { Link } from "react-router-dom";
const ChangeYourPassword = () => {
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  console.log(token);

  const formik = useFormik({
    initialValues: { password: "" },
    validate: (v) => {
      const e = {};
      if (!v.password) e.password = "Vui lòng nhập mật khẩu mới!";
      else if (v.password.length < 6)
        e.password = "Mật khẩu phải có ít nhất 6 ký tự!";
      return e;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(userChangePasswordAction(values.password, token));
        message.success("Đổi mật khẩu thành công!");
      } catch (error) {
        message.error("Đổi mật khẩu thất bại!", error);
      } finally {
        setSubmitting(false);
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
          Đặt Lại Mật Khẩu
        </Typography.Title>

        {/* Password */}
        <div style={{ marginBottom: 24 }}>
          <Input.Password
            name="password"
            placeholder="Nhập mật khẩu mới"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            style={{
              height: 48,
              borderRadius: 10,
              fontSize: 16,
              borderColor: "#ccc",
              padding: "0 12px",
            }}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography.Text type="danger">
              {formik.errors.password}
            </Typography.Text>
          )}
        </div>

        {/* Submit */}
        <Link to={"/login"}>
          <Button
            htmlType="submit"
            type="text"
            block
            loading={formik.isSubmitting}
            className={styles["btn-change-password"]}
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
            Đặt Lại Mật Khẩu
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default ChangeYourPassword;
