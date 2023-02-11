import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InforWindow,
} from "@react-google-maps/api";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import AddReviewForm from "./components/AddReviewForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Navbar";

function App() {
  const [review, setReview] = useState([]);
  const [placeData, setPlaceData] = useState(null);

  //get all reviews
  useEffect(() => {
    const getReviews = async () => {
      try {
        const review = await axios.get("http://localhost:8800/api/reviews");
        // setReview(response.data)
        console.log(review.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, []);

  //   axios
  //     .get("http://localhost:8800/api/reviews")
  //     .then((response) => {
  //       // setReview(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {});
  // }, []);


  return (
    <>
      <Navbar />
      <div className="Nav-Container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="first-row">
        <Map />
        <AddReviewForm />
        <div className="create-review-container"></div>
      </div>
    </>
  );
}

export default App;
