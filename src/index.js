import React, { useState } from "react";
import ReactDOM from "react-dom";
import CategoryForm from "./components/categoryForm";
import CategoryItem from "./components/categoryItem";
import Header from "./components/header";

import "./index.scss";

const data = [
  {
    name: "Eyes",
    symptoms: [
      "Aura",
      "Shooting stars",
      "Grey curtain",
      "Double vision",
      "Strain",
    ],
  },
  {
    name: "Back",
    symptoms: [
      "Lower",
      "Upper",
      "Mid",
      "Shoulder blades",
      "Butt",
      "Nerve Pain",
      "Numb",
    ],
  },
  {
    name: "Digestive",
    symptoms: [
      "Acid",
      "Nausea ",
      "Bloating",
      "Cramps",
      "Constipation",
      "Diarrhea",
      "Gas",
    ],
  },
  {
    name: "Neck",
    symptoms: [],
  },
  {
    name: "TMJ",
    symptoms: ["Left", "Right", "Both", "Muscle Fatigue", "Neck Pain", "Numb"],
  },
  {
    name: "Light headed",
    symptoms: [],
  },
];

const Main = () => {
  const [currentCategory, setCurrentCategory] = useState("");
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
          {data.map((category, idx) => (
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
