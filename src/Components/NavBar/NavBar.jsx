import React, { useContext, useEffect } from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export default function NavBar() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { numOfCartItems, getCart, numOfWishlistItems, getWishlist } =
    useContext(CartContext);
  let location = useLocation();

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getWishlist();
  }, []);

  function handleLogout() {
    setUserToken(null);
    localStorage.removeItem("token");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fw-bold fixed-top ">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={`${
                      location.pathname === "/home"
                        ? "text-main nav-link"
                        : "nav-link text-black"
                    }`}
                    aria-current="page"
                    to={"/home"}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={`${
                      location.pathname === "/products"
                        ? "text-main nav-link"
                        : "nav-link text-black"
                    }`}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`path-Link ${
                      location.pathname === "/categories"
                        ? "text-main nav-link"
                        : "nav-link text-black"
                    }`}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`${
                      location.pathname === "/brands"
                        ? "text-main nav-link"
                        : "nav-link text-black"
                    }`}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`${
                      location.pathname === "/allorders"
                        ? "text-main nav-link"
                        : "nav-link text-black"
                    }`}
                    to="/allorders"
                  >
                    My Orders
                  </NavLink>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {/* <li className="nav-item">
                <Link target={"_blank"} to="https://www.instagram.com/">
                  <i className="fa-brands fa-instagram mx-2"></i>
                </Link>
                <Link target={"_blank"} to="https://www.facebook.com/">
                  <i className="fa-brands fa-facebook mx-2"></i>
                </Link>
                <Link target={"_blank"} to="https://www.tiktok.com/">
                  <i className="fa-brands fa-tiktok mx-2"></i>
                </Link>
                <Link target={"_blank"} to="https://www.twitter.com/">
                  <i className="fa-brands fa-twitter mx-2"></i>
                </Link>
                <Link target={"_blank"} to="https://www.linkedin.com/">
                  <i className="fa-brands fa-linkedin mx-2"></i>
                </Link>
              </li> */}

              {userToken ? (
                <>
                  <li className="nav-item position-relative me-4">
                    <NavLink
                      className={`${
                        location.pathname === "/wishlist"
                          ? "text-main nav-link"
                          : "nav-link text-black"
                      }`}
                      to="/wishlist"
                    >
                      <i className="fas fa-solid fa-heart fs-5"></i>
                      <span className="position-absolute top-75 start-100 translate-middle badge rounded-pill bg-danger h6">
                        {numOfWishlistItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item position-relative me-4">
                    <NavLink
                      className={`${
                        location.pathname === "/cart"
                          ? "text-main nav-link"
                          : "nav-link text-black"
                      }`}
                      to="/cart"
                    >
                      <i className="fa-solid fa-cart-shopping fs-5"></i>
                      <span className="position-absolute top-75 start-100 translate-middle badge rounded-pill bg-main h6">
                        {numOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink
                      className={`${
                        location.pathname === "/profile"
                          ? "text-main nav-link"
                          : "nav-link text-black"
                      }`}
                      to={"/profile"}
                    >
                      Profile
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <Link
                      className="nav-link text-black"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={`${
                        location.pathname === "/register"
                          ? "text-main nav-link"
                          : "nav-link text-black"
                      }`}
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={`${
                        location.pathname === "/login"
                          ? "text-main nav-link"
                          : "nav-link text-black"
                      }`}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
