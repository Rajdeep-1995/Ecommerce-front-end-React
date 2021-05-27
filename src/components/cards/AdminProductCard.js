import React from "react";
import { Card } from "antd";
import defaultImage from "../../productImages/default.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
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
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-primary" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
