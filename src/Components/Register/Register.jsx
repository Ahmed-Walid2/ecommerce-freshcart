import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Register() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3).max(15),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .max(11)
      .matches(
        /^[A-Z][A-Za-z0-9_]{5,11}$/,
        "Passowrd must be at least 6 letters and starts with captial letter"
      ),
    rePassword: Yup.string()
      .required("Re-Password must match Password")
      .oneOf([Yup.ref("password")], "Re-Password must match Password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid Phone"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleRegister(values),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function handleRegister(values) {
    setError(null);
    setLoader(true);

    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        if (res.data.message === "success") {
          setLoader(false);
          setError(null);
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
          <h1>Register Now :</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="name">
              Name :
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <span className="text-danger">{formik.errors.name}</span>
            )}
          </div>
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
            <label className="form-label" htmlFor="password">
              Password :
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-danger">{formik.errors.password}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="rePassword">
              RePassword :
            </label>
            <input
              id="rePassword"
              name="rePassword"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <span className="text-danger">{formik.errors.rePassword}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="phone">
              Phone :
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-danger">{formik.errors.phone}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn bg-main text-white d-block ms-auto"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loader ? "Loading..." : "Register"}
          </button>
        </form>
      </div>

      <HelmetProvider>
        <Helmet>
          <title>Register</title>
        </Helmet>
      </HelmetProvider>
    </section>
  );
}
