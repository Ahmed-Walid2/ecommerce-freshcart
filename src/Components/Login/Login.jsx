import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Login() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
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
    onSubmit: (values) => handleLogin(values),
  });

  function testEmail() {
    handleLogin({ email: "usertest@yahoo.com", password: "Test123" });
  }

  async function handleLogin(values) {
    setLoader(true);
    setError(null);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          setLoader(false);
          setError(null);
          setUserToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoader(false);
        // console.log(err);
      });
  }

  return (
    <section className="min-vh-100  py-5">
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>
      <div className="container pt-4 ">
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
          <h1>Login Now :</h1>
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
          <div className="form-group mb-2">
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

          <span
            onClick={() => testEmail()}
            className="text-main fw-bold mb-4 d-inline-block cursor-pointer h6 text-decoration-underline"
          >
            Try a test email
          </span>

          <button
            type="submit"
            className="btn bg-main text-white mb-2 d-block"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loader ? "Loading..." : "Login"}
          </button>
          <Link to={"/forgot-password"}>
            <span className="text-main fw-bold text-decoration-underline">
              Forgot Password
            </span>
          </Link>
          <div className="fw-semibold mt-1">
            Don't have an account?
            <Link to={"/register"}>
              <span className="text-main fw-bold text-decoration-underline">
                Register Now
              </span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
