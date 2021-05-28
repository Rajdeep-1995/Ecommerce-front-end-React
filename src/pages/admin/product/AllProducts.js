import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { removeProduct } from "../../../functions/product";
import { toast } from "react-toastify";

import { getAllProductsByCount } from "../../../functions/product";

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    getAllProductsByCount(20).then((result) => {
      setProducts(result.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      removeProduct(user.token, slug)
        .then((res) => {
          console.log(res.data);
          toast.success(`"${res.data.title}" is deleted`);
          getProducts();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Products</h4>
            )}
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 pb-2">
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
