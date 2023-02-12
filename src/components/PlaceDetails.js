import { useEffect, useState } from "react";
import DataManager from "/src/data/DataManager";
import Map from "./Map";
import AddReviewForm from "/components/AddReviewForm";
import Review from "/components/Review";
import axios from "axios";

//place details component
export default function PlaceDetails({ place }) {
  // const review = ({ review })
  const [review, setReview] = useState(null);

  useEffect(() => {
    console.log("new place selected", { place });
  }, [place]);

  //function to make query to back end to get reviews associated wtih a place by place ID
  const getReviewsByPlaceID = (placeID) => {
    return axios
      .get(`http://localhost:8800/reviews?placeId=${placeID}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  };
  getReviewsByPlaceID();

  return <div>{review ? <Review review={review} /> : <AddReviewForm />}</div>;
}

//reviews component
//get place id
//makes query to backend and receives the result
//renders results to screent

//add new review function is call

//make request to backend to get reviews associated with a place using place id
//show the reviews results
//if there are no reviews than only show the add review button
//if there are reviews than display the
