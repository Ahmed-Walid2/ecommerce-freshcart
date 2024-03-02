import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <section className=" z-3 bg-white d-flex justify-content-center align-items-center position-fixed w-100 min-vh-100 start-0 top-0 end-0 bottom-0">
      <div className={`${styles.loader}`}></div>
    </section>
  );
}
