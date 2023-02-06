import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InforWindow,
} from "@react-google-maps/api";
import "./App.css";
import axios from "axios";

function App() {
//Run on component initialization. Backend connection working. 
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
    <div className="App">
      <header className="App-header">
        <p>hello</p>
      </header>
    </div>
  );
}

export default App;
