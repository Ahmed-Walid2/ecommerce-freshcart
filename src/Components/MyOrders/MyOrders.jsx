import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./MyOrders.module.css";

export default function MyOrders() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const { id } = jwtDecode(token);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    getOrders();
  }, [id]);

  async function getOrders() {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      if (data?.length) {
        setOrders(data);
        setIsLoading(false);
        setError(null);
      } else {
        setOrders(null);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
    }
  }

  return (
    <section className="py-5 min-vh-100">
      <HelmetProvider>
        <Helmet>
          <title>My Orders</title>
        </Helmet>
      </HelmetProvider>
      <div className="container pt-4">
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {isLoading && <Loader />}
        <h1 className="mb-4 text-main fw-bold">My Orders</h1>

        {orders ? (
          orders.map((order, i) => (
            <div
              key={i}
              className="orderDetails mb-5 bg-main-light p-3 rounded-2"
            >
              <div className=" mb-3">
                <h2 className="mb-3 fw-bold">
                  Order Number: <span className="text-main">{i + 1}</span>
                </h2>
                <h3 className="mb-2 h5 fw-bold">
                  Payment Method : {order.paymentMethodType}
                </h3>
                {/* <h3 className="mb-2 h5 fw-bold">Email : {order.user.email}</h3> */}
                <h3 className="mb-2 h5 fw-bold">
                  Your City is: <span>{order.shippingAddress.city}</span>
                </h3>
                <h3 className="mb-2 h5 fw-bold">
                  Your Phone is: {order.shippingAddress.phone}
                </h3>
              </div>
              <div className="row">
                {order.cartItems.map((item, i) => (
                  <div key={i} className="col-sm-4 col-md-3 col-lg-2">
                    <img
                      className="img-fluid mb-3"
                      src={item.product.imageCover}
                      alt={item.product.title.split(" ").slice(0, 3).join(" ")}
                    />
                    <h4 className="h6 text-main mb-2 p-1">
                      {item.product.category.name}
                    </h4>
                    <h3 className="h6 mb-2 p-1">
                      {item.product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between p-1">
                      <p>{item.price} EGP</p>
                      <p>
                        {item.product.ratingsAverage}
                        <i className="fas fa-star rating-color ms-1"></i>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center mt-3">You don't have Orders</h2>
        )}
      </div>
    </section>
  );
}
