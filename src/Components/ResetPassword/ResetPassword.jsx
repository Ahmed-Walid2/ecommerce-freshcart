import styles from "./ResetPassword.module.css";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .max(11)
      .matches(
        /^[A-Z][A-Za-z0-9_]{5,11}$/,
        "Passowrd must be at least 6 letters and starts with captial letter"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleResetPw(values),
  });

  async function handleResetPw(values) {
    setLoader(true);
    setError(null);
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoader(false);
          setError(null);
          setUserToken(null);
          localStorage.removeItem("token", res.data.token);
          navigate("/login");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoader(false);
      });
  }

  return (
    <section className="min-vh-100  py-5">
      <div className="container pt-4 ">
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
          <h1>Reset Password :</h1>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="email">
              Email :
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-danger">{formik.errors.email}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="newPassword">
              New Password :
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <span className="text-danger">{formik.errors.newPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-main text-white ms-auto d-block"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loader ? "Loading..." : "Confirm"}
          </button>
        </form>
      </div>
      <HelmetProvider>
        <Helmet>
          <title>Reset Password</title>
        </Helmet>
      </HelmetProvider>
    </section>
  );
}
