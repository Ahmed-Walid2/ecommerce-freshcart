import React from "react";
import styles from "./NotFound.module.css";
import errorPage from "../../assets/images/error.svg";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function NotFound() {
  return (
    <section className="py-5">
      <figure className="d-flex justify-content-center align-items-center mt-5">
        <img className="w-50" src={errorPage} alt="Not Found" />
      </figure>
      <HelmetProvider>
        <Helmet>
          <title>Not Found</title>
        </Helmet>
      </HelmetProvider>
    </section>
  );
}
