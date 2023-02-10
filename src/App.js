import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker,InforWindow, } from "@react-google-maps/api";
import "./App.css";
import axios from "axios";
import CreateNewReview from "./components/CreateNewReview";
import Login from "./components/Login";
import Reviews from "./components/Reviews";
import Register from "./components/Register";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Map from "./components/Map";


function App() {
  useEffect(() => {
    runAxios();
  }, []);
  async function runAxios() {
    console.log("runAxios()");
    axios.get("http://localhost:8800/api/users").then((response) => {
      console.log(response.data);
    });
  }

  const [place, setPlace] = useState(null)
  const [review, setReview] = useState(null)
  

//get place id on user search


  const onReviewClick = (id) => {
    console.log("Hi, I'm in the App and the place id is" + id);
    setReview(id);
  };

 


  return (
    <>
      <Navbar />
      <div className="Nav-Container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
      <div className="first-row">
      <Map />
      <div className="create-review-container">
      <CreateNewReview />
      </div>
      </div>
    </>
  );
}

export default App;
