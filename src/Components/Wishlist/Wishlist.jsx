import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const { getWishlist, addToCart, removeFromWishlist } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function getWishlistDetails() {
    setIsLoading(true);
    try {
      let res = await getWishlist();
      if (res?.status === "success") {
        setIsLoading(false);
        setWishlist(res.data);
        setError(null);
      } else {
        setWishlist(null);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Something Went Wrong");
      console.log(error);

      setIsLoading(false);
    }
  }

  async function addProductToCart(productId) {
    setIsLoading(true);

    let res = await addToCart(productId);
    if (res.status === "success") {
      setIsLoading(false);

      toast.success(res.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      toast.error("Something Went Wrong", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  }

  async function removeProductFromWishlist(productId) {
    setIsLoading(true);
    let res = await removeFromWishlist(productId);
    if (res?.status === "success") {
      setIsLoading(false);
      getWishlistDetails();
      toast.error(res.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      toast.error("Something Went Wrong", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    getWishlistDetails();
  }, []);

  return (
    <section className="py-5 min-vh-100">
      <HelmetProvider>
        <Helmet>
          <title>Wishlist</title>
        </Helmet>
      </HelmetProvider>
      {isLoading && <Loader />}
      <div className="container pt-4">
        <h1 className="mb-4 text-main fw-bold h2">My Wishlist</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        {wishlist &&
          wishlist.map((ele, i) => (
            <div key={i} className="card my-3">
              <div className="row gy-4 align-items-center">
                <div className="col-md-4 col-sm-3">
                  <img className="img-fluid" src={ele.imageCover} alt="" />
                </div>
                <div className="col-md-8 col-sm-9">
                  <div className="card-body">
                    <h3 className="mb-3 h5 fw-bold">{ele.title}</h3>
                    <h4 className="mb-3 h5 fw-bold">
                      Brand: <span className="text-main">{ele.brand.name}</span>
                    </h4>
                    <h4 className="mb-3 h5 fw-bold">
                      Category:
                      <span className="text-main"> {ele.category.name}</span>
                    </h4>
                    <h4 className="mb-3 h5 fw-bold">
                      Rating:
                      <span className="text-main">
                        {ele.ratingsAverage}
                        <i className="fa fa-star rating-color ms-2"></i>
                      </span>
                    </h4>
                    <h4 className="mb-4 h5 fw-bold">
                      Price : <span className="text-main">{ele.price}</span>
                    </h4>
                    <button
                      onClick={() => removeProductFromWishlist(ele._id)}
                      className="btn btn-outline-danger ms-auto d-block mb-4"
                    >
                      <i className="fa fa-trash me-2"></i>Remove
                    </button>
                    <button
                      onClick={() => addProductToCart(ele._id)}
                      className="btn bg-main text-white w-100"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {wishlist == 0 || wishlist == undefined ? (
          <>
            <h2 className="text-center mt-3">
              <figure className="mb-3">
                <img
                  className="img-fluid rounded-2 inline-block"
                  src={require("../../assets/images/wishlist-empty.jpg")}
                  alt=""
                />
              </figure>
              <div className="text-center mb-3 text-danger h4 fw-bold">
                Your Wishlist is Empty
              </div>

              <Link to={"/home"}>
                <button className="btn btn-success bg-main">
                  Continue Shopping
                </button>
              </Link>
            </h2>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
