import { useEffect, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import axios from "axios";
import DataManager from "../data/DataManager";

// React component Reviews - displays all reviews on screen taht it receives
function Reviews({ reviews }) {
  if (!reviews) {
    return <div>No reviews found</div>;
  }

  return (
    <ul>
      {reviews.map((review) => {
        const { id, title, description, rating, checkboxes } = review;
        return (
          <li key={id}>
            <h3>{title}</h3>
            <h3>{description}</h3>
            <p>{rating}</p>
            <p>{checkboxes}</p>
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

    const { placeID } = place;
    console.log("new place selected", { placeID, place });
    DataManager.getReviews(placeID).then((reviews) => {
      console.log("got reviews!", { reviews });
      setReviews(reviews);
    });
  }, [place]);

  //post new review to DB
  //show reviews results for a place
  //if there are not places than show only review button
  return (
    <>
      <AddReviewForm />
      <Reviews reviews={reviews} />
    </>
  );
}

//add new review function is call

//make request to backend to get reviews associated with a place using place id
//show the reviews results
//if there are no reviews than only show the add review button

// useEffect(() => {
//   console.log("new place selected", { place });
// }, [place]);

// const getReviewsByPlaceID = (placeID) => {
//   axios
//     .get(`http://localhost:8800/reviews?placeID=${placeID}`)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//     });
// };
// getReviewsByPlaceID();
