import React from "react";
import { Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userRegisterAction } from "../../../Redux/actions/ManageUsersAction/ManageUsersAction";
import styles from "./RegisterBuyer.module.css";

export default function RegisterBuyer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      password: "",
      email: "",
      role: "BUYER",
    },
    validate: (values) => {
      const errors = {};
      if (!values.displayName)
        errors.displayName = "Vui lòng nhập tên tài khoản!";
      if (!values.password) errors.password = "Vui lòng nhập mật khẩu!";
      if (!values.email) errors.email = "Vui lòng nhập email!";
      if (!values.xacNhanMatKhau)
        errors.xacNhanMatKhau = "Vui lòng nhập lại mật khẩu!";
      else if (values.xacNhanMatKhau !== values.password)
        errors.xacNhanMatKhau = "Mật khẩu không khớp!";
      return errors;
    },
    onSubmit: async (values) => {
      const { xacNhanMatKhau, ...registerProfile } = values; 
      try {
        await dispatch(userRegisterAction(registerProfile));
        navigate("/login");
      } catch (error) {
        // đã xử lý lỗi ở trong action bằng message.error rồi
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
        noValidate
      >
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Đăng ký người dùng
        </Typography.Title>

        {/* displayName */}
        <Input
          name="displayName"
          placeholder="Tên tài khoản"
          autoComplete="displayName"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={
            formik.touched.displayName && formik.errors.displayName
              ? "error"
              : ""
          }
          style={{
            height: "50px",
            border: "1px solid #E7E7E7",
            outline: "none",
            width: "100%",
            borderRadius: "10px",
            padding: "0 20px",
            marginBottom: 8,
            background: "transparent",
          }}
        />
        {formik.touched.displayName && formik.errors.displayName && (
          <Typography.Text type="danger">
            {formik.errors.displayName}
          </Typography.Text>
        )}

        {/* PASSWORD */}
        <Input.Password
          name="password"
          placeholder="Mật khẩu"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
          style={{
            height: "50px",
            border: "1px solid #E7E7E7",
            outline: "none",
            width: "100%",
            borderRadius: "10px",
            padding: "0 20px",
            marginBottom: 8,
            background: "transparent",
          }}
        />
        {formik.touched.password && formik.errors.password && (
          <Typography.Text type="danger">
            {formik.errors.password}
          </Typography.Text>
        )}

        {/* XÁC NHẬN MẬT KHẨU */}
        <Input.Password
          name="xacNhanMatKhau"
          placeholder="Xác nhận mật khẩu"
          autoComplete="new-password"
          value={formik.values.xacNhanMatKhau}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={
            formik.touched.xacNhanMatKhau && formik.errors.xacNhanMatKhau
              ? "error"
              : ""
          }
          style={{
            height: "50px",
            border: "1px solid #E7E7E7",
            outline: "none",
            width: "100%",
            borderRadius: "10px",
            padding: "0 20px",
            marginBottom: 8,
            background: "transparent",
          }}
        />
        {formik.touched.xacNhanMatKhau && formik.errors.xacNhanMatKhau && (
          <Typography.Text type="danger">
            {formik.errors.xacNhanMatKhau}
          </Typography.Text>
        )}

        {/* EMAIL */}
        <Input
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched.email && formik.errors.email ? "error" : ""}
          style={{
            height: "50px",
            border: "1px solid #E7E7E7",
            outline: "none",
            width: "100%",
            borderRadius: "10px",
            padding: "0 20px",
            marginBottom: 16,
            background: "transparent",
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <Typography.Text type="danger">{formik.errors.email}</Typography.Text>
        )}

        {/* ĐĂNG KÝ */}
        <Button
          htmlType="submit"
          type="text"
          block
          className={styles["btn-register"]}
          style={{
            background: "rgb(0, 0, 0)",
            color: "white",
            width: "100%",
            padding: "20px",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          Đăng ký
        </Button>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Typography.Text>
            Bạn đã có tài khoản?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1890ff",
                fontWeight: 500,
              }}
            >
              Đăng nhập
            </Link>
          </Typography.Text>
        </div>
      </form>
    </div>
  );
}
