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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onMarkerClick(data) {
    const place = data.place;
    setSelectedPlace(place);
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onShowLogin={() => setShowLogin(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onMarkerClick={onMarkerClick}
              selectedPlace={selectedPlace}
              setShowLogin={setShowLogin}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setShowLogin={setShowLogin}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function Home({
  onMarkerClick,
  selectedPlace,
  setShowLogin,
  setIsLoggedIn,
  currentUser,
}) {
  return (
    <div className="all-rows">
      <div className="first-row">
        <Map onMarkerClick={onMarkerClick} />
      </div>
      <div className="second-row">
        <PlaceDetails
          place={selectedPlace}
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default App;
