import { useEffect, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import DataManager from "../data/DataManager";
import "./Map.css";

// React component Reviews - displays all reviews on screen that it receives
function Reviews({ reviews }) {
  if (!reviews) return <div>reviews are loading</div>;

  if (!reviews.length)
    return <div className="review-message">there are no reviews</div>;

  return (
    <ul>
      {reviews.map((review, i) => {
        const { name, title, description, rating, features } = review;
        return (
          <li key={i}>
            <h2>{name}</h2>
            <h3>{title}</h3>
            <h3>{description}</h3>
            <p>{rating}</p>
            <p>{features}</p>
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
        <div className="show-reviews">
          <h1>REVIEWS</h1>
          <Reviews reviews={reviews} />
        </div>
        <div className="reivews-form">
          <AddReviewForm placeId={place?.placeId} />
        </div>
    </div>
  );
}

//add new review function is call

//make request to backend to get reviews associated with a place using place id
//show the reviews results
//if there are no reviews than only show the add review button

// useEffect(() => {
//   console.log("new place selected", { place });
// }, [place]);

// const getReviewsByPlaceID = (placeId) => {
//   axios
//     .get(`http://localhost:8800/reviews?placeId=${placeId}`)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//     });
// };
// getReviewsByPlaceID();
