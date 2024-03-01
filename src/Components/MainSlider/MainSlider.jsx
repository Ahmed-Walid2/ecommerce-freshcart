import React from "react";
import Slider from "react-slick";

import styles from "./MainSlider.module.css";

export default function MainSlider() {
  const images = [
    {
      src: require("../../assets/images/slider-image-1.jpeg"),
      alt: "Slider 1",
    },
    {
      src: require("../../assets/images/slider-image-2.jpeg"),
      alt: "Slider 2",
    },
    {
      src: require("../../assets/images/slider-image-3.jpeg"),
      alt: "Slider 3",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <section className="py-5">
      <div className="container pt-4">
        {/* <h2>Main Slider</h2> */}
        <div className="row g-0">
          <div className="col-9">
            <Slider {...settings}>
              {images.map((img, i) => (
                <figure key={i}>
                  <img className={styles.wSlider} src={img.src} alt={img.alt} />
                </figure>
              ))}
            </Slider>
          </div>
          <div className="col-3">
            <figure className="mb-0">
              <img
                className={styles.wBanner}
                src={require("../../assets/images/grocery-banner.png")}
                alt="banner 1"
              />
            </figure>
            <figure>
              <img
                className={styles.wBanner}
                src={require("../../assets/images/grocery-banner-2.jpeg")}
                alt="banner 1"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
