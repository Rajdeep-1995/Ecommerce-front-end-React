import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
  const { slug } = match.params;
  const [product, setProduct] = useState("");

  const loadProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };
  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>

        <div className="row">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Related Products</h4>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
