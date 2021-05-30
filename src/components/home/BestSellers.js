import React, { useState, useEffect } from "react";
import LoadingCard from "../../components/cards/LoadingCard";
import ProductCard from "../../components/cards/ProductCard";
import { getProducts, getCountProduct } from "../../functions/product";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const loadProducts = (pageNumber = 1, limit = 3) => {
    setLoading(true);
    //sorting on maximul sold products
    getProducts("sold", "desc", pageNumber, limit).then((result) => {
      setProducts(result.data);
      setLoading(false);
    });
  };

  const loadCountProduct = () => {
    getCountProduct().then((result) => setTotalCount(result.data));
  };

  useEffect(() => {
    loadCountProduct();
    loadProducts();
  }, []);
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <br />
      <div className="text-center m-2">
        <Pagination
          total={totalCount}
          pageSize={3}
          onChange={(page, pageSize) => loadProducts(page, pageSize)}
          defaultCurrent={0}
        />
      </div>
      <br />
      <br />
    </>
  );
};

export default BestSellers;
