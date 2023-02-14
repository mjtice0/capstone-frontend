import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import PlaceDetails from "./components/PlaceDetails";
import "./Navbar.css";

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
        <div className="first-row">
          <Map onMarkerClick={onMarkerClick} />
          <PlaceDetails place={selectedPlace} />
        </div>
        <Routes> 
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
         </Routes>

      <div className="footer-container">
        <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

