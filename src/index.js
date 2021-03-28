import React, { useState } from "react";
import ReactDOM from "react-dom";
import CategoryForm from "./components/categoryForm";
import CategoryItem from "./components/categoryItem";
import Header from "./components/header";

import "./index.scss";
import { get } from "./utils/axios";

const Main = () => {
  const { loading, data } = get("http://localhost:3030/pain-items");
  const [currentCategory, setCurrentCategory] = useState("");
  if (loading) {
    return <div>Loading</div>;
  }

  if (data.error) {
    return <div>{data.error}</div>;
  }

  return (
    <main>
      <Header title={currentCategory || "Pain Tracker"} />
      {!!currentCategory ? (
        <CategoryForm
          name={currentCategory}
          symptoms={
            data.find((category) => category["name"] === currentCategory)
              .symptoms
          }
          handleSubmit={() => setCurrentCategory("")}
        />
      ) : (
        <section className="category-items">
          {data.length &&
            data.map((category, idx) => (
              <CategoryItem
                key={`${category.name}-${idx}`}
                name={category.name}
                handleCategoryClick={() => {
                  setCurrentCategory(category.name);
                }}
              />
            ))}
        </section>
      )}
    </main>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
