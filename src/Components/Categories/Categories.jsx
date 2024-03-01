import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./Categories.module.css";

export default function Categories() {
  const { getCart, getWishlist } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    getWishlist();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isError, isLoading } = useQuery("Categories", getCategories);
  return (
    <section className="py-5">
      <HelmetProvider>
        <Helmet>
          <title>Categories</title>
        </Helmet>
      </HelmetProvider>
      <div className="container mt-4">
        <h2 className="mb-3 text-main fw-bold">Categories</h2>
        {isLoading && <Loader />}
        {isError && (
          <div className="alert alert-danger mt-2">Something Went Wrong</div>
        )}
        {data?.data.data && (
          <div className={`row gy-4`}>
            {data.data.data.map((ele, i) => (
              <div key={i} className="col-md-4 col-sm-6 ">
                <div className="card product">
                  <figure>
                    <img
                      className={` w-100 max-height `}
                      src={ele.image}
                      alt={ele.name}
                    />
                  </figure>
                  <h4 className={`text-center fw-bold h5 text-main`}>
                    {ele.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
