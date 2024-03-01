import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import styles from "./FeaturedProducts.module.css";

export default function FeaturedProducts() {
  const {
    addToCart,
    addToWishlist,
    idsFromWishlist,
    getWishlist,
    removeFromWishlist,
  } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [categoryWord, setCategoryWord] = useState("All's");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  function handleCategory(category) {
    setCategoryWord(category);
  }

  async function addProductToWishlist(productId) {
    setLoading(true);
    let res = await addToWishlist(productId);
    if (res.status === "success") {
      getWishlist();
      toast.success(res.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
      setLoading(false);
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

  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { isLoading, isError, data } = useQuery("FeaturedProducts", getProducts);

  // console.log(data, isError);
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // async function getProducts() {
  //   setError(null);
  //   setLoading(true);
  //   await axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((res) => {
  //       setProducts(res.data.data);
  //       setLoading(false);
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       setProducts([]);
  //       setError(err.response.data.message);
  //       setLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <section className="py-5">
        {(isLoading || loading) && <Loader />}

        <div className="container pt-4">
          <h2 className="mb-5">Featured Products</h2>
          <input
            type="search"
            placeholder="Search..."
            className="form-control w-75 mx-auto mb-5"
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <div className="d-flex justify-content-evenly my-5">
            <span
              className={`${styles.categoryLink}  fw-bold ms-2`}
              onClick={(e) => {
                handleCategory(e.target.innerHTML);
              }}
            >
              All's
            </span>
            <span
              className={`${styles.categoryLink}  fw-bold ms-2`}
              onClick={(e) => {
                handleCategory(e.target.innerHTML);
              }}
            >
              Men's Fashion
            </span>
            <span
              className={`${styles.categoryLink}  fw-bold ms-2`}
              onClick={(e) => {
                handleCategory(e.target.innerHTML);
              }}
            >
              Women's Fashion
            </span>
            <span
              className={`${styles.categoryLink}  fw-bold ms-2`}
              onClick={(e) => {
                handleCategory(e.target.innerHTML);
              }}
            >
              Electronics
            </span>
          </div>
          {isError && (
            <div className="alert alert-danger mt-2">Something Went Wrong</div>
          )}
          {data?.data.data && (
            <div className="row">
              {data.data.data
                .filter((product) => {
                  return product === ""
                    ? product
                    : product.title
                        .toLowerCase()
                        .includes(searchWord.toLowerCase());
                })
                .filter((product) => {
                  return categoryWord === "All's"
                    ? product
                    : product.category.name === categoryWord;
                })
                .map((product) => (
                  <div
                    key={product._id}
                    className="col-lg-2 col-md-3 col-sm-4 col-6"
                  >
                    <div className="product mb-3 p-2">
                      <Link to={`/product-details/${product.id}`}>
                        <img
                          className="img-fluid mb-3"
                          src={product.imageCover}
                          alt={product.title.split(" ").slice(0, 3).join(" ")}
                        />
                        <h4 className="h6 text-main mb-2 p-1">
                          {product.category.name}
                        </h4>
                        <h3 className="h6 mb-2 p-1">
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </h3>
                        <div className="d-flex justify-content-between p-1 mb-1">
                          <p>{product.price} EGP</p>
                          <p>
                            {product.ratingsAverage}
                            <i className="fas fa-star rating-color ms-1"></i>
                          </p>
                        </div>
                      </Link>
                      {/* <div className="heartIcon h4 cursor-pointer d-flex justify-content-end mb-3 ">
                      <i
                        onClick={() => addProductToWishlist(product.id)}
                        className="fas fa-solid fa-heart"
                      ></i>
                    </div> */}

                      {idsFromWishlist.some(
                        (colorId) => colorId._id === product.id
                      ) ? (
                        <div className="heartIcon h4 cursor-pointer d-flex justify-content-end mb-3">
                          <i
                            onClick={() =>
                              removeProductFromWishlist(product.id)
                            }
                            className="fas fa-solid fa-heart text-danger"
                          ></i>
                        </div>
                      ) : (
                        <div className="heartIcon h4 cursor-pointer d-flex justify-content-end mb-3 ">
                          <i
                            onClick={() => addProductToWishlist(product.id)}
                            className="fas fa-solid fa-heart"
                          ></i>
                        </div>
                      )}

                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="btn bg-main w-100 text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
