import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";

const Product = ({ match }) => {
  const { slug } = match.params;
  const [product, setProduct] = useState("");

  const loadProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return <div>{JSON.stringify(product)}</div>;
};

export default Product;
