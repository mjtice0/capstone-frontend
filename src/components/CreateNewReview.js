import React, { useState } from "react";
import "./Map.css";
import { features } from "./features";

const CreateNewReview = (props) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState("");
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
    setReviewRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!");

    //   const newReview = {
    //     title: reviewTitle,
    //     description: reviewDescription,
    //     rating: reviewRating,
    //   };

    //   props.onSubmitReview(newReview);
    //   setReviewTitle("");
    //   setReviewDescription("");
    //   setReviewRating(0);
  };

  return (
    <div className="create-review-container">
      {/* <h2 className="review-header">Reviews</h2> */}
      <form className="review-form" onSubmit={handleSubmit}>
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
        <button className="submitButton" type="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewReview;
