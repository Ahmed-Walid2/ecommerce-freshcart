import React from "react";
import styles from "./ErrorPage.module.css";
import errorPage from "../../assets/images/error.svg";

export default function ErrorPage() {
  return (
    <section className="py-5">
      <figure className="d-flex justify-content-center align-items-center mt-5">
        <img className="w-50" src={errorPage} alt="Not Found" />
      </figure>
    </section>
  );
}
