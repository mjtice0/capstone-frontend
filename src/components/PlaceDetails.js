import { useEffect, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import DataManager from "../data/DataManager";
import "./Map.css";

// React component Reviews - displays all reviews on screen that it receives
function Reviews({ reviews, place }) {
  if (!reviews.length)
    return (
      <h3 className="reviewHeading"> 😔 Sorry, there are no reviews yet.</h3>
    );

  return (
    <ul className="reviews-list">
      {reviews.map((review, i) => {
        const { name, title, description, rating, features } = review;
        return (
          <li key={i} className="review-item">
            <h3 className="review-title">Name: {name}</h3>
            <h3 className="review-title">Title: {title}</h3>
            <h3 className="review-title">Review: {description}</h3>
            <h3 className="review-title">Rating: {"★".repeat(rating)}</h3>
            <h3 className="review-title">Features: {features}</h3>
          </li>
        );
      })}
    </ul>
  );
}

export default function PlaceDetails({ place }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!place) return;

    const { placeId } = place;
    console.log("new place selected", { placeId, place });
    DataManager.getReviews(placeId).then((reviews) => {
      console.log("got reviews!", { reviews });
      setReviews(reviews);
    });
  }, [place]);

  return (
    <div className="reviews-container">
      <div className="reviews">
        {/* <h2>Reviews for {place.name}</h2> */}
        <Reviews reviews={reviews} />
      </div>
      <div className="reivews-form">
        <AddReviewForm placeId={place?.placeId} />
      </div>
    </div>
  );
}
