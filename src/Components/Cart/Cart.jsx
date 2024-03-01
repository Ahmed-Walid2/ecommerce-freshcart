import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./Cart.module.css";

export default function Cart() {
  const { getCart, numOfCartItems, removeFromCart, clearCart, updateQty } =
    useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  async function getCartDetails() {
    try {
      setIsLoading(true);
      let res = await getCart();
      if (res?.status === "success") {
        setCartDetails(res.data);
        setIsLoading(false);
        setError(null);
      } else {
        setCartDetails(null);
        setIsLoading(false);
        setError(null);
        // setNumOfCartItems(0);
      }
    } catch (error) {
      setError("Something Went Wrong");
      console.log(error);

      setIsLoading(false);
    }
  }

  async function removeProductFromCart(productId) {
    setIsLoading(true);
    let res = await removeFromCart(productId);
    if (res.status === "success") {
      setCartDetails(res.data);
      setIsLoading(false);
      toast.error("Product removed from Cart successfully", {
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

  async function clearAllCart() {
    setIsLoading(true);
    let res = await clearCart();
    // console.log(res);
    if (res.message === "success") {
      setCartDetails(null);
      setIsLoading(false);

      toast.error("All Products removed from Cart successfully", {
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

  async function updateProductQty(productId, count) {
    if (count < 1) {
      removeProductFromCart(productId);
    } else {
      setIsLoading(true);

      const res = await updateQty(productId, count);
      // console.log(res);
      if (res.status === "success") {
        setIsLoading(false);
        setCartDetails(res.data);

        toast.success("Product quantity updated successfully", {
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
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <section className="min-vh-100 py-5">
      <HelmetProvider>
        <Helmet>
          <title>My Cart</title>
        </Helmet>
      </HelmetProvider>
      <div className="container pt-4">
        <h2 className="mb-4 text-main fw-bold">Shopping Cart</h2>

        {isLoading && <Loader />}
        {error && <div className="alert alert-danger">{error}</div>}

        {cartDetails ? (
          <section className="bg-main-light p-3">
            <button
              onClick={clearAllCart}
              className="btn btn-outline-danger mb-4 ms-auto d-block"
            >
              Clear Cart
            </button>
            <div className="d-flex justify-content-between">
              <h4 className="h5">
                Total Price:
                <span className="text-main"> {cartDetails.totalCartPrice}</span>
              </h4>
              <h4 className="h5">
                Total Number:
                <span className="text-main"> {numOfCartItems}</span>
              </h4>
            </div>
            {cartDetails.products.map((product, i) => (
              <div
                key={i}
                className="row align-items-center border-bottom py-3 my-3"
              >
                <div className="col-lg-1 col-md-1">
                  <figure>
                    <img
                      className="img-fluid"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </figure>
                </div>
                <div className="col-lg-9 col-md-8">
                  <h3>{product.product.title}</h3>
                  <h4 className="text-main">{product.price}</h4>
                  <button
                    onClick={() => removeProductFromCart(product.product.id)}
                    className="btn text-danger"
                  >
                    <i className="fa fa-trash me-2"></i>Remove
                  </button>
                </div>
                <div className="col-lg-2 col-md-3">
                  <button
                    onClick={() =>
                      updateProductQty(product.product.id, product.count + 1)
                    }
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    // disabled={product.count <= 1}
                    onClick={() =>
                      updateProductQty(product.product.id, product.count - 1)
                    }
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            {numOfCartItems ? (
              <Link to={"/checkout"} className="btn btn-success bg-main w-100">
                Checkout
              </Link>
            ) : (
              <>
                <h2 className="text-center mt-3">
                  <figure className="mb-3">
                    <img
                      className="img-fluid rounded-2"
                      src={require("../../assets/images/empty-cart.png")}
                      alt=""
                    />
                  </figure>

                  <div className="text-center mb-3 text-danger h4 fw-bold">
                    Your Cart is Empty
                  </div>

                  <Link to={"/home"}>
                    <button className="btn btn-success bg-main">
                      Continue Shopping
                    </button>
                  </Link>
                </h2>
              </>
            )}
          </section>
        ) : (
          <>
            <h2 className="text-center mt-3">
              <figure className="mb-3">
                <img
                  className="img-fluid rounded-2"
                  src={require("../../assets/images/empty-cart.png")}
                  alt=""
                />
              </figure>
              <div className="text-center mb-3 text-danger h4 fw-bold">
                Your Cart is Empty
              </div>

              <Link to={"/home"}>
                <button className="btn btn-success bg-main">
                  Continue Shopping
                </button>
              </Link>
            </h2>
          </>
        )}
      </div>
    </section>
  );
}
