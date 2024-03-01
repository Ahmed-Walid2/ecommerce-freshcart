import React, { useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

import styles from "./Products.module.css";

export default function Products() {
  return (
    <section className="py-4">
      <HelmetProvider>
        <Helmet>
          <title>Products</title>
        </Helmet>
      </HelmetProvider>
      <FeaturedProducts />
    </section>
  );
}
