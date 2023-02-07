import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InforWindow,
// } from "@react-google-maps/api";
import "./App.css";
import axios from "axios";
import Review from "./components/Review";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";

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
      <div className="contaner">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
