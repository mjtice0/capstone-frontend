import React, { useState } from "react";
import "./Map.css";
import { features } from "../data/features";
import DataManager from "../data/DataManager";

const AddReviewForm = ({ placeId }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(-1);
  const [reviewFeatures, setReviewFeatures] = useState([]); // array of String

  const onChangeFeature = (event) => {
    const features = new FormData(event.target.form).getAll("feature");
    setReviewFeatures(features);
  };

  const handleReviewName = (event) => {
    setReviewName(event.target.value);
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

    const featuresValue = reviewFeatures.sort().join(", ");
    console.log(featuresValue);

    const newReview = {
      name: reviewName,
      title: reviewTitle,
      description: reviewDescription,
      rating: reviewRating,
      features: featuresValue,

      // checkboxes: checkedState,
    };

    DataManager.addReview(placeId, newReview);
    setReviewName("");
    setReviewTitle("");
    setReviewDescription("");
    setReviewRating(-1);
    setReviewFeatures([]);
  };

  //enable submit review button when there are characters in description and rating
  const enabled =
    reviewTitle.length > 0 && reviewDescription.length > 0 && reviewRating;

  return (
    <div className="create-review-container">
      {/* <h2 className="review-header">Reviews</h2> */}
      <form className="review-form" onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter name"
          value={reviewName}
          onChange={handleReviewName}
        />
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
          <h2 className="checkbox-heading">Accessibility Features:</h2>
          <ul className="features-list">
            {features.map(({ name }, index) => {
              return (
                <li key={index}>
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name="feature"
                      value={name}
                      checked={reviewFeatures.includes(name)}
                      onChange={onChangeFeature}
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
