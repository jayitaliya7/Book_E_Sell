import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import styles from "./Signup.module.css";
import ShowError from "../../components/ShowError";
import authService from "../../service/auth.service";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  roleId: 3,
  password: "",
  confirmPassword: "",
};
const RegisterSchema = Yup.object({
  firstName: Yup.string().min(2).max(25).required("Enter firstName"),
  lastName: Yup.string().min(2).max(25).required("Enter lastName"),
  email: Yup.string().email().required("email was required"),
  password: Yup.string().min(8).required("Enter Password"),
  roleId: Yup.number().required("Role is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password or confirmPassword Must be same"
  ),
});

const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,
      onSubmit: (data, action) => {
        delete data.confirmPassword;
        authService.create(data).then((res) => {
          navigate("/login");
          toast.success("Successfully registered");
        });
        action.resetForm();
      },
    });

  console.log(errors);
  return (
    <>
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
            className={`${styles.form_submit}`}
          >
            <div className={`${styles.main_warper}`}>
              <div className={`${styles.row} ${styles.row_1}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    className="w-full"
                    autoComplete="off"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName ? (
                    <ShowError error={errors.firstName} />
                  ) : (
                    <p></p>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    name="lastName"
                    className="w-full"
                    autoComplete="off"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName ? (
                    <ShowError error={errors.lastName} />
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className={`${styles.row} ${styles.row_2}`}>
                <div className={`${styles.w_full}`}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="email"
                    className={`${styles.w_full}`}
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
              </div>
              <div className={`${styles.row} ${styles.row_3}`}>
                <div className={`${styles.w_full}`}>
                  <FormControl className={`${styles.w_full}`}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      label="roles"
                      value={values.roleId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="roleId"
                    >
                      {/* <MenuItem value="1">Admin</MenuItem> */}
                      <MenuItem value="2">Seller</MenuItem>
                      <MenuItem value="3">Buyer</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className={`${styles.row} ${styles.row_3}`}>
                <div className={`${styles.w_full}`}>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    className={`${styles.w_full}`}
                    autoComplete="off"
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
              </div>
              <div className={`${styles.row} ${styles.row_3}`}>
                <div className={`${styles.w_full}`}>
                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    className={`${styles.w_full}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <ShowError error={errors.confirmPassword} />
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <Button type="submit" variant="contained">
                Signup
              </Button>
              <div className="">
                Already have an account{" "}
                <Link
                  to="/login"
                  style={{ color: "red", textDecoration: "none" }}
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
