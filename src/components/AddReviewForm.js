import React, { useState } from "react";
import "./Map.css";
import { features } from "../data/features";
import DataManager from "../data/DataManager";

const AddReviewForm = ({ placeId }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const [isReviewActive, setIsReviewActive] = useState(false);
  const [reviewFeatures, setReviewFeatures] = useState([]); // array of String
  const onChangeFeature = (event) => {
    const features = new FormData(event.target.form).getAll("feature") ?? [];
    setReviewFeatures(features);
  };

  const formShow = () => setIsReviewActive(true);

  const handleReviewName = (event) => {
    setReviewName(event.target.value);
  };

  const handleReviewTitle = (event) => {
    setReviewTitle(event.target.value);
  };
  const handleReviewDescription = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!");

    const featuresValue = reviewFeatures.sort().join(", ");
    console.log({ featuresValue });

    const newReview = {
      name: reviewName,
      title: reviewTitle,
      description: reviewDescription,
      rating: reviewRating,
      features: featuresValue,
    };

    DataManager.addReview(placeId, newReview);
    setReviewName("");
    setReviewTitle("");
    setReviewDescription("");
    setReviewRating(0);
    setReviewFeatures([]);
  };

  const enabled =
    reviewTitle.length > 0 && reviewDescription.length > 0 && reviewRating;

  if (!isReviewActive)
    return (
    
      <button className="addReviewButton" onClick={formShow}>
        Add New Review
      </button>
  
    );
  return (
    <div className="create-review-container">
      <form className="review-form" onSubmit={handleFormSubmit}>
        <div className="name-title-description">
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
        </div>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= reviewRating ? "on" : "off"}
                onClick={() => setReviewRating(index)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
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

