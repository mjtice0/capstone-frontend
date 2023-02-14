import React, { useState, useEffect } from "react";
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
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/accessibilityLogo.png";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App;

// return (
//     <>
//       <nav className="navbar">
//         <Link to="/" className="site-heading">
//           <img src={logo} alt="accessibility-logo" className="logo" />
//         </Link>
//         <ul>
//           <Link to="/login">Home</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//       <div className="first-row">
//          <Map onMarkerClick={onMarkerClick} />
//          <PlaceDetails place={selectedPlace} />
//        </div>
//     </>
//   );
// }
