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
import Header from "./components/header/Header";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  function onMarkerClick(data) {
    console.log("onMarkerClick()", data);
    const place = data.place;
    setSelectedPlace(place);
  }

  return (
    <>
      <div className="Nav-Container">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="first-row">
        <Map onMarkerClick={onMarkerClick} />
        <PlaceDetails place={selectedPlace} />
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App;
