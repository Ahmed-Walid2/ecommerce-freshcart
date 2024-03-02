import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Checkout() {
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const { cartId, setNumOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const headers = {
    token: localStorage.getItem("token"),
  };
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid Phone"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handlePayment(values),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function handlePayment(values) {
    const endpoint = isOnlinePayment
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    try {
      const { data } = await axios.post(
        endpoint,
        { shippingAddress: values },
        { headers }
      );
      if (data.status === "success") {
        toast.success("Order placed  successfully", {
          position: "bottom-right",
          autoClose: 2000,
        });
        setNumOfCartItems(0);

        if (isOnlinePayment) {
          window.open(data.session.url);
        } else {
          setTimeout(() => {
            navigate("/allorders");
          }, 5000);
        }
        console.log(data);
      } else {
        toast.error("Something Went Wrong", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <section className="py-5 min-vh-100">
      <div className="container pt-4">
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
          <h1 className="mb-3">Checkout</h1>

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="city">
              City :
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}
            />
            {/* {formik.errors.email && formik.touched.email && (
              <span className="text-danger">{formik.errors.email}</span>
            )} */}
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
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="details">
              Details :
            </label>
            <textarea
              cols="30"
              rows="3"
              id="details"
              name="details"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.details}
              onBlur={formik.handleBlur}
            ></textarea>
            {/* {formik.errors.password && formik.touched.password && (
              <span className="text-danger">{formik.errors.password}</span>
            )} */}
          </div>

          <div className="d-flex mb-3">
            <input
              type="checkbox"
              id="payOnline"
              onChange={() => setIsOnlinePayment(!isOnlinePayment)}
            />
            <label className="ms-1 fw-bold" htmlFor="payOnline">
              Pay Online
            </label>
          </div>
          {isOnlinePayment ? (
            <button
              type="submit"
              onClick={handlePayment}
              className="btn btn-success bg-main"
            >
              Online Payment
            </button>
          ) : (
            <button
              type="submit"
              onClick={handlePayment}
              className="btn btn-success bg-main"
            >
              Cash Payment
            </button>
          )}
        </form>
      </div>
      <HelmetProvider>
        <Helmet>
          <title>Checkout</title>
        </Helmet>
      </HelmetProvider>
    </section>
  );
}
