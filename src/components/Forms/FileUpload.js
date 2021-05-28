import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let uploadedImages = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/imageuploads`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                uploadedImages.push(res.data);
                setValues({ ...values, uploadedImages });
                setLoading(false);
              })
              .catch((err) => {
                console.log("Cloudinary image uplaod failed--->", err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleRemoveImage = (public_id) => {
    setLoading(true);
    const { images } = values;
    axios
      .post(
        `${process.env.REACT_APP_API}/imageremove`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        let filterdImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterdImages });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((img) => (
            <Badge
              key={img.public_id}
              count="X"
              onClick={() => handleRemoveImage(img.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={img.url} size={110} className="m-2" shape="square" />
            </Badge>
          ))}
      </div>

      <div className="row">
        <label className="btn btn-primary btn-raised m-2 mb-4">
          Choose images
          <input
            type="file"
            multiple
            accept="images/*"
            hidden
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
