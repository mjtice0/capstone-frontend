import { useEffect, useState } from "react";
import Map from "./Map";

//place details component
export default function PlaceDetails({ place }) {
  useEffect(() => {
    console.log("new place selected", { place });
  }, [place]);

  return <></>;
}

//reviews component
//get place id
//makes query to backend and receives the result
//renders results to screent

//add new review function is call
