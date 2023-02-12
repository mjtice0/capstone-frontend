import React, { useState } from "react";
import "./Map.css";
import { features } from "../data/features";
import DataManager from "../data/DataManager";

const AddReviewForm = (props) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(-1);
  const [checkedState, setCheckedState] = useState(
    new Array(features.length).fill(false)
  );

  const handleOnChange = (position) => {
    console.log("Im working");
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleReviewTitle = (event) => {
    setReviewTitle(event.target.value);
  };
  const handleReviewDescription = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleReviewRating = (event) => {
    setReviewRating(parseInt(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!");

       const newReview = {
         title: reviewTitle,
         description: reviewDescription,
         rating: reviewRating,
         checkboxes: checkedState
       };

       DataManager.addReview(newReview);
       setReviewTitle("");
       setReviewDescription("");
       setReviewRating(-1);
       setCheckedState(false);
  };

  //enable submit review button when there are characters in description and rating
  const enabled = reviewTitle.length > 0 && reviewDescription.length > 0 && reviewRating;
  

  return (
    <div className="create-review-container">
      {/* <h2 className="review-header">Reviews</h2> */}
      <form className="review-form" onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter a title"
          value={reviewTitle}
          onChange={handleReviewTitle}
        />
        <label>Description:</label>
        <input
          type="text"
          placeholder="Enter Review"
          value={reviewDescription}
          onChange={handleReviewDescription}
        />
        <label>Rating:</label>
        <select value={reviewRating} onChange={handleReviewRating}>
          <option value="1">🦖</option>
          <option value="2">🦖🦖</option>
          <option value="3">🦖🦖🦖</option>
          <option value="4">🦖🦖🦖🦖</option>
          <option value="5">🦖🦖🦖🦖🦖</option>
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
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="submitButton" type="Submit" disabled={!enabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
