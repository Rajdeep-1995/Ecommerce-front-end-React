import React from "react";

const CategoryForm = ({ handleSubmit, setName, name, btnName, enable }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          autoFocus={enable}
          value={name}
          required
        />
        <br />
        <button className="btn btn-outline-primary">{btnName}</button>
      </div>
    </form>
  );
};

export default CategoryForm;
