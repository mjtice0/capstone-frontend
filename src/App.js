import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import Navbar from "./Navbar";
import PlaceDetails from "./components/PlaceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  function onMarkerClick(data) {
    const place = data.place;
    setSelectedPlace(place);
  }

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onMarkerClick={onMarkerClick}
                selectedPlace={selectedPlace}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </GoogleOAuthProvider>
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
}
export default App;
// const myStorage = window.localStorage;
// const [showRegister, setShowRegister] = useState(false);
// const [showLogin, setShowLogin] = useState(false);
// const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
