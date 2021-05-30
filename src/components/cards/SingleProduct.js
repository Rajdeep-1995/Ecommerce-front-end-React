import React from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../productImages/default.jpg";
import ProductListItems from "./ProductListItems";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, description, images } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel autoPlay infiniteLoop emulateTouch showArrows>
            {images.map((photo) => (
              <img src={photo.url} key={photo.public_id} />
            ))}
          </Carousel>
        ) : (
          <img
            className="mb-4"
            style={{ height: "350px", width: "100%", objectFit: "cover" }}
            src={defaultImage}
          />
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description ? description : "This product has no description"}
          </TabPane>
          <TabPane tab="More" key="2">
            Contact us on xxx-xxx-xxxx to get more information about the product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-2">{title}</h1>

        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br /> Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br /> Add to wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
