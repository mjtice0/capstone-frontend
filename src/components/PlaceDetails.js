import { useEffect, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import DataManager from "../data/DataManager";
import "./Map.css";

// React component Reviews - displays all reviews on screen that it receives
function Reviews({ reviews, place }) {
  // const [showForm, setShowForm] = useState(false);

  // const handleAddReviewClick = () => {
  //   setShowForm(true);
  // };

  // if (!reviews) return <div>There are no reviews</div>;

  if (!reviews.length)
    return (
      <div className="review-message">
        <h3>There are no reviews yet. Add review here!</h3>
        {/* <button onClick={handleAddReviewClick} className="reviews-button" type="Submit">
          Add Review
        </button> */}
      </div>
    );

  //add place name to render when a place is selected
  return (
    <ul className="reviews-list">
      {reviews.map((review, i) => {
        const { name, title, description, rating, features } = review;
        return (
          <li key={i}>
            <h3>Name: {name}</h3>
            <h3>Title: {title}</h3>
            <h3>Review: {description}</h3>
            <h3>Rating: {rating}</h3>
            <h3>Features: {features}</h3>
          </li>
        );
      })}
    </ul>
  );
}

export default function PlaceDetails({ place }) {
  const [reviews, setReviews] = useState([]);

  // new place provided. fetch reviews from DB and setReviews()
  useEffect(() => {
    if (!place) return;

    const { placeId } = place;
    console.log("new place selected", { placeId, place });
    DataManager.getReviews(placeId).then((reviews) => {
      console.log("got reviews!", { reviews });
      setReviews(reviews);
    });
  }, [place]);

  //post new review to DB
  //show reviews results for a place
  //if there are not places than show only review button
  return (
      <div className="reviews-container">
        <div className="show-review">
          <Reviews reviews={reviews} />
        </div>

        <div className="reivews-form">
          <AddReviewForm placeId={place?.placeId} />
        </div>
      </div>
  );
}
