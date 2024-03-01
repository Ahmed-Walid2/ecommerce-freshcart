import styles from "./ForgotPassword.module.css";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleForgotPw(values),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function handleForgotPw(values) {
    setLoader(true);
    setError(null);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusMsg === "success") {
          setLoader(false);
          setError(null);
          navigate("/verify-password");
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
          <h1>Forgot Password :</h1>
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

          <button
            type="submit"
            className="btn bg-main text-white ms-auto d-block"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loader ? "Loading..." : "Next"}
          </button>
        </form>
      </div>
      <HelmetProvider>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
      </HelmetProvider>
    </section>
  );
}
