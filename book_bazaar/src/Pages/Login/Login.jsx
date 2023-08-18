import React from "react";
import styles from "./Style.module.css";
import { TextField, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import authService from "../../service/auth.service";
import * as Yup from "yup";
import ShowError from "../../components/ShowError";
const initialValues = {
  email: "",
  password: "",
};
const loginschema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
});
const Login = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginschema,
      onSubmit: (data, action) => {
        authService
          .login(data)
          .then((res) => {
            toast.success("Login successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log("result", res);
          })
          .catch((err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_LEFT,
            });
          });
        action.resetForm();
      },
    });
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container}`}>
        <div className={`${styles.text_warper}`}>
          <div className={`${styles.text}`}>
            <h1>Login or Create an Account </h1>
          </div>
        </div>
        <div className={`${styles.main}`}>
          <form
            method="POST"
            onSubmit={handleSubmit}
            style={{
              rowGap: "20px",
              display: "flex",
              flexDirection: "column",
              width: "60vw",
              margin: "auto",
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className={`${styles.w_full}`}
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <ShowError error={errors.email} />
              ) : (
                <p></p>
              )}
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                className={`${styles.w_full}`}
                autoComplete="off"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <ShowError error={errors.password} />
              ) : (
                <p></p>
              )}
            </div>
            <Button type="submit" variant="contained">
              Log In
            </Button>
            <div
              className="text-center font-semibold"
              style={{ textAlign: "center" }}
            >
              Don't have an account{" "}
              <Link to="/" style={{ textDecoration: "none", color: "red" }}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
