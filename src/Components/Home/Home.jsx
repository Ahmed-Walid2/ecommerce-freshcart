import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styles from "./Home.module.css";

export default function Home() {
  const { getCart, getWishlist } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <section className="min-vh-100">
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProducts />
    </section>
  );
}
