import React from "react";

const CategoryItem = ({ name, handleCategoryClick }) => {
  return (
    <button className="category-item" onClick={handleCategoryClick}>
      {name}
    </button>
  );
};

export default CategoryItem;
