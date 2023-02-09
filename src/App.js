import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InforWindow,
} from "@react-google-maps/api";
import "./App.css";
import axios from "axios";
import CreateNewReview from "./components/CreateNewReview";
import Login from "./components/Login";
// import from "./components/Register";
import Review from "./components/Review";
import Register from "./components/Register";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Map from "./components/Map";


function App() {
  //Run on component initialization. Connect to backend --working
  useEffect(() => {
    runAxios();
  }, []);
  async function runAxios() {
    console.log("runAxios()");
    axios.get("http://localhost:8800/api/users").then((response) => {
      console.log(response.data);
    });
  }

  return (
    <>
      <Navbar />
      <div className="Nav-Container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review" element={<Review />} />
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
