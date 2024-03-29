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
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("App Component - userId:", userId);

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
              setUserId={setUserId}
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
  userId,
}) {
  console.log("Home Component - userId:", userId);
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
          userId={userId}
        />
      </div>
    </div>
  );
}

export default App;
