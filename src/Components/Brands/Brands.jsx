import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./Brands.module.css";

export default function Brands() {
  const { getCart, getWishlist } = useContext(CartContext);

  useEffect(() => {
    getCart();
    getWishlist();
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data, isError, isLoading } = useQuery("Brands", getBrands);

  return (
    <section className="py-5 min-vh-100">
      <HelmetProvider>
        <Helmet>
          <title>Brands</title>
        </Helmet>
      </HelmetProvider>
      {isLoading && <Loader />}
      <div className="container pt-4">
        <h1 className="text-center text-main fw-bold mb-4">All Brands</h1>

        {isError && (
          <div className="alert alert-danger mt-2">Something Went Wrong</div>
        )}

        {data?.data.data && (
          <div className="row gy-3">
            {data.data.data.map((brand) => (
              <div key={brand._id} className="col-md-3 col-sm-4 col-6">
                <Link to={brand._id}>
                  <div className="brand product cursor-pointer card">
                    <img
                      className="w-100 text-main"
                      src={brand.image}
                      alt={brand.name}
                    />
                    <h3 className="text-center font-sm text-main fw-bold">
                      {brand.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
