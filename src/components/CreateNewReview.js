import React, { useState } from "react";
import "./Map.css";
import { features } from "./features";

const CreateNewReview = () => {
  const [review, setReview] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // const handleOnChange = () => {
  //   setIsChecked(!isChecked);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!");
  };

  return (
    <div className="create-review-container">
      {/* <h2 className="review-header">Reviews</h2> */}
      <form className="review-form" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" placeholder="Enter a title" name="title" />
      <label>Description:</label>
      <input type="text" placeholder="Enter Review" name="description" />
      <label>Rating:</label>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    <div className="accessibility-checklist">
      <h2>Accessibility Features:</h2>
      <ul className="features-list">
        {features.map(({ name }, index) => {
          return (     
            <li key={index}>
              <div className="left-section">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            </li>
            );
          })}
      </ul>
    </div>
    <button className="submitButton" type="Submit">Submit 
    </button>
    </form>
  </div>
  );
};

export default CreateNewReview;


{/* <label>Username:</label>
      <input type="text" placeholder="Enter Name" name="Username" /> */}