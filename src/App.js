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
import Footer from "./components/Footer";
import PlaceDetails from "./components/PlaceDetails";


function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  function onMarkerClick(data) {
    console.log("onMarkerClick()", data);
    const place = data.place
    setSelectedPlace(place)
  }

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
        <Map onMarkerClick={onMarkerClick} />
        {/* <AddReviewForm /> */}
        <PlaceDetails place={selectedPlace} />
      </div>

      <div className="footer-container">
        <Footer />
      </div>
      
    </>
  );
}

export default App;

//get all reviews
// useEffect(() => {
//   const getReviews = async () => {
//     try {
//       const review = await axios.get("http://localhost:8800/api/reviews");
//       // setReview(response.data)
//       console.log(review.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getReviews();
// }, []);

//   axios
//     .get("http://localhost:8800/api/reviews")
//     .then((response) => {
//       // setReview(response.data);
//       console.log(response.data);
//     })
//     .catch((error) => {});
// }, []);
