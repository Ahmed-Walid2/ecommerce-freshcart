import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./SpecificBrand.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function SpecificBrand() {
  const { id } = useParams();
  const [specificBrand, setSpecificBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getSpecificBrand(id) {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setSpecificBrand(data.data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    getSpecificBrand(id);
  }, []);

  return (
    <section className="py-5 ">
      {isLoading && <Loader />}

      <div className="container pt-4">
        <h1 className="text-main">Specific Brand</h1>
        {error && (
          <div className="alert alert-danger mt-2">Something Went Wrong</div>
        )}
        {specificBrand && (
          <div className="row">
            <div className="col-md-12 text-center">
              <img
                className="img-fliud"
                src={specificBrand.image}
                alt={specificBrand.name}
              />
            </div>
            <HelmetProvider>
              <Helmet>
                <title>{specificBrand.name}</title>
              </Helmet>
            </HelmetProvider>
          </div>
        )}
      </div>
    </section>
  );
}
