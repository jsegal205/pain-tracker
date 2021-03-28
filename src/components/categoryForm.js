import React, { useState } from "react";
import axios from "axios";

const CategoryForm = ({ name, symptoms, handleSubmit }) => {
  const [form, setForm] = useState({ name, selectedSymptoms: [] });
  return (
    <section className="category-form">
      <article className="symptom-list">
        {symptoms.map((symptom, idx) => (
          <button
            key={`${symptom}-${idx}`}
            className={`symptom${
              form.selectedSymptoms.includes(symptom) ? " selected" : ""
            }`}
            onClick={() => {
              const tmpSymptoms = form.selectedSymptoms;
              if (tmpSymptoms.includes(symptom)) {
                const rmIdx = tmpSymptoms.findIndex((sym) => sym === symptom);
                tmpSymptoms.splice(rmIdx, 1);
              } else {
                tmpSymptoms.push(symptom);
              }
              setForm({ ...form, selectedSymptoms: tmpSymptoms });
            }}
          >
            {symptom}
          </button>
        ))}
      </article>
      <section className="optional-notes">
        <label htmlFor="optional-notes">Optional Notes:</label>
        <textarea
          name="optional-notes"
          onChange={(e) => {
            setForm({ ...form, optionalNotes: e.target.value });
          }}
        />
      </section>
      <button
        className="symptom-submit"
        onClick={() => {
          axios
            .post("http://localhost:3030/pain-items", form)
            .then(() => {
              handleSubmit();
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }}
      >
        Submit
      </button>
    </section>
  );
};

export default CategoryForm;
