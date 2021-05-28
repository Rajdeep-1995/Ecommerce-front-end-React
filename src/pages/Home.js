import React, { useState, useEffect } from "react";
import { getAllProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    getAllProductsByCount(3).then((result) => {
      setProducts(result.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return <div>{JSON.stringify(products)}</div>;
};

export default Home;
