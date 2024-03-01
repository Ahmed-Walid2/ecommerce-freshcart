import styles from "./VerifyPassword.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function VerifyPassword() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    resetCode: "",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("ResetCode is required")
      .matches(/^[0-9]{6}$/, "ResetCode must be 6 numbers"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleVerifyPw(values),
  });

  async function handleVerifyPw(values) {
    setLoader(true);
    setError(null);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        if (res.data.status === "Success") {
          setLoader(false);
          setError(null);
          navigate("/reset-password");
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
          <h1>Reset Code :</h1>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="resetCode">
              ResetCode :
            </label>
            <input
              id="resetCode"
              name="resetCode"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <span className="text-danger">{formik.errors.resetCode}</span>
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
          <title>Verify Password</title>
        </Helmet>
      </HelmetProvider>
    </section>
  );
}
