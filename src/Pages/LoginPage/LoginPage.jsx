import React from "react";
import { Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userLoginAction } from "../../Redux/actions/ManageUsersAction/ManageUsersAction";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "Vui lòng nhập email!";
      if (!values.password) errors.password = "Vui lòng nhập mật khẩu!";
      return errors;
    },
    onSubmit: (values) => {
      dispatch(userLoginAction(values, navigate));
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

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
        onSubmit={handleSubmit}
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
          Đăng Nhập
        </Typography.Title>

        {/* Email */}
        <div style={{ marginBottom: 24 }}>
          <Input
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            status={touched.email && errors.email ? "error" : ""}
            style={{
              height: 48,
              borderRadius: 10,
              fontSize: 16,
              borderColor: "#ccc",
              padding: "0 12px",
            }}
          />
          {touched.email && errors.email && (
            <Typography.Text type="danger">{errors.email}</Typography.Text>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: 32 }}>
          <Input.Password
            name="password"
            placeholder="Mật khẩu"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            status={touched.password && errors.password ? "error" : ""}
            style={{
              height: 48,
              borderRadius: 10,
              fontSize: 16,
              borderColor: "#ccc",
              padding: "0 12px",
            }}
          />
          {touched.password && errors.password && (
            <Typography.Text type="danger">{errors.password}</Typography.Text>
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
          Đăng Nhập
        </Button>

        {/* Links */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            to="/register/buyer"
            style={{
              marginRight: 8,
              textDecoration: "none",
              color: "#1890ff",
              fontWeight: 500,
            }}
          >
            Đăng Ký
          </Link>
          <Link
            to="/account/fg-password"
            style={{
              textDecoration: "none",
              color: "#6e6060",
              fontWeight: 500,
            }}
          >
            Quên Mật Khẩu
          </Link>
        </div>
      </form>
    </div>
  );
}
