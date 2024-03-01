import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
  const [loading, setLoading] = useState(false);

  const {
    addToCart,
    addToWishlist,
    idsFromWishlist,
    getWishlist,
    removeFromWishlist,
  } = useContext(CartContext);
  const { id } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function addProductToWishlist(productId) {
    setLoading(true);
    let res = await addToWishlist(productId);

    if (res.status === "success") {
      getWishlist();
      setLoading(false);
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
    setLoading(true);
    let res = await removeFromWishlist(productId);
    if (res.status === "success") {
      setLoading(false);
      getWishlist();
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

  async function addProductToCart(productId) {
    setLoading(true);
    let res = await addToCart(productId);
    if (res.status === "success") {
      setLoading(false);
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

  async function getDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  let { isLoading, data, isError } = useQuery("productDetails", getDetails);
  return (
    <section className="py-5 min-vh-100">
      {(isLoading || loading) && <Loader />}
      <div className="container pt-4">
        <div className="row align-items-center">
          <h2 className="mb-4">Product Details</h2>

          {isError && (
            <div className="alert alert-danger">Something Went Wrong</div>
          )}
          {data?.data.data && (
            <>
              <HelmetProvider>
                <Helmet>
                  <title>{data.data.data.title}</title>
                </Helmet>
              </HelmetProvider>

              <div className="col-md-3">
                <Slider className="w-75 mx-auto mb-5" {...settings}>
                  {data.data.data.images.map((img, i) => (
                    <figure key={i}>
                      <img
                        className="img-fluid"
                        src={img}
                        alt={data.data.data.title}
                      />
                    </figure>
                  ))}
                </Slider>
              </div>
              <div className="col-md-9 ">
                <h3>{data.data.data.title}</h3>
                <p className="text-muted">{data.data.data.description}</p>
                <div className="d-flex justify-content-between p-1 align-items-center">
                  <div>
                    <h4>{data.data.data.category.name}</h4>
                    <p>{data.data.data.price}EGP</p>
                  </div>

                  <p>
                    {data.data.data.ratingsAverage}
                    <i className="fas fa-star rating-color ms-1"></i>
                  </p>
                </div>
                {/* <div className="heartIcon  h4  cursor-pointer d-flex justify-content-end mb-3 ">
                  <i
                    onClick={() => addProductToWishlist(id)}
                    className="fas fa-solid fa-heart"
                  ></i>
                </div> */}

                {idsFromWishlist.some((colorId) => colorId._id === id) ? (
                  <div className="heartIcon h4 cursor-pointer d-flex justify-content-end mb-3">
                    <i
                      onClick={() => removeProductFromWishlist(id)}
                      className="fas fa-solid fa-heart text-danger"
                    ></i>
                  </div>
                ) : (
                  <div className="heartIcon h4 cursor-pointer d-flex justify-content-end mb-3 ">
                    <i
                      onClick={() => addProductToWishlist(id)}
                      className="fas fa-solid fa-heart"
                    ></i>
                  </div>
                )}

                <button
                  onClick={() => addProductToCart(id)}
                  className="btn bg-main w-100 text-white"
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
