import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  handleChangeOption,
  subOptions,
  showSubs,
  setValues,
  values,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Shipping</label>
          <select
            className="form-control"
            name="shipping"
            onChange={handleChange}
          >
            <option>Please Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <select className="form-control" name="color" onChange={handleChange}>
            <option>Please Select</option>
            {colors.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select className="form-control" name="brand" onChange={handleChange}>
            <option>Please Select</option>
            {brands.map((b, index) => (
              <option key={index} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            onChange={handleChangeOption}
            name="category"
          >
            <option>Please select one</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {showSubs && (
          <div>
            <label>Sub categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select one or multiple options"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length > 0 &&
                subOptions.map((subs) => (
                  <Option value={subs._id}>{subs.name}</Option>
                ))}
            </Select>
          </div>
        )}

        <br />
        <button className="btn btn-outline-info">Submit</button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
