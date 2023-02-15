import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import Navbar from "./Navbar";
import PlaceDetails from "./components/PlaceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const myStorage = window.localStorage;
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));

  function onMarkerClick(data) {
    console.log("onMarkerClick()", data);
    const place = data.place;
    setSelectedPlace(place);
  }

  return (
    <>
      {/* <div className="Nav-Container"> */}
        <Navbar />
        {currentUser ? (
          <button className="logoutButton">Log out</button>
        ) : (
          <div className="buttons">
            <button
              className="loginButton"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </button>
            <button
              className="registerButton"
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} />}
        {/* <div className="first-row"> */}
          <Map onMarkerClick={onMarkerClick} />
        {/* </div> */}
        <div className="second-row">
          <PlaceDetails place={selectedPlace} />
        </div>
      {/* </div> */}
    </>
  );
}

export default App;
