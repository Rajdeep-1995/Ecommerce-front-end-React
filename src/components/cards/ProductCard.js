import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../productImages/default.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <div>
      <Card
        style={{ border: "1px solid grey" }}
        className="p-2 m-2"
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            style={{
              height: "150px",
              objectFit: "cover",
            }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" />
            <p>View Product</p>
          </Link>,

          <div>
            <ShoppingCartOutlined className="text-warning" />
            <p>Add to cart</p>
          </div>,
        ]}
      >
        <Meta title={title} description={description.slice(0, 50) + "..."} />
      </Card>
    </div>
  );
};

export default ProductCard;
