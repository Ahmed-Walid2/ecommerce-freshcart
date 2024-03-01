import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import styles from "./CategoriesSlider.module.css";

export default function CategoriesSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isError, isLoading } = useQuery(
    "CategoriesSlider",
    getCategories
  );
  return (
    <section>
      <div className="container">
        <h2 className="mb-3">Popular Categories</h2>
        {isLoading && <Loader />}
        {isError && (
          <div className="alert alert-danger mt-2">Something Went Wrong</div>
        )}
        {data?.data.data && (
          <div className={`row w-100 `}>
            <Slider {...settings}>
              {data.data.data.map((ele, i) => (
                <div key={i} className="col-2 ">
                  <img
                    className={` img-fliud ${styles.hImg} mb-2`}
                    src={ele.image}
                    alt={ele.name}
                  />
                  <h4
                    className={`text-center text-main h6 fw-bold ${styles.smallFont}`}
                  >
                    {ele.name}
                  </h4>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
