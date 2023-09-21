import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import Navbar from "./Navbar";
import PlaceDetails from "./components/PlaceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function onMarkerClick(data) {
    const place = data.place;
    setSelectedPlace(place);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onMarkerClick={onMarkerClick}
              selectedPlace={selectedPlace}
              setShowLogin={setShowLogin}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setShowLogin={setShowLogin}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function Home({ onMarkerClick, selectedPlace }) {
  return (
    <div className="all-rows">
      <div className="first-row">
        <Map onMarkerClick={onMarkerClick} />
      </div>
      <div className="second-row">
        <PlaceDetails place={selectedPlace} />
      </div>
    </div>
  );
  ``;
}
export default App;
