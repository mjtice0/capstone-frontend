import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

//useState for users search location
export function SearchPlace() {
  const [searchBox, setSearchBox] = useState(null);

  const onPlaceChange = () => console.log(searchBox.getPlaces());
  const onSearchBoxLoad = ref => {
    setSearchBox(ref);
  }

}