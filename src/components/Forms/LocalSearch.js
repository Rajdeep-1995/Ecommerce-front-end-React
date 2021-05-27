import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  return (
    <div>
      <input
        type="search"
        className="form-control mb-4"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        placeholder="Search"
      />
    </div>
  );
};

export default LocalSearch;
