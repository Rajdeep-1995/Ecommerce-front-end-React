import React, { useState } from "react";
import { Card } from "antd";
import defaultImage from "../../productImages/default.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  const [visible, setVisible] = useState(false);
  const [saveSlug, setSaveSlug] = useState("");

  const checkModel = (slug) => {
    setVisible(true);
    setSaveSlug(slug);
  };

  return (
    <>
      <Modal
        title="Confirm"
        visible={visible}
        onOk={() => handleRemove(saveSlug)}
        onCancel={() => setVisible(false)}
        okText="Confirm"
        cancelText="Cancle"
      >
        <p>Are you sure you want to delete {saveSlug}?</p>
      </Modal>

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
            onClick={() => checkModel(slug)}
          />,
        ]}
      >
        <Meta title={title} description={description.slice(0, 50) + "..."} />
      </Card>
    </>
  );
};

export default AdminProductCard;
