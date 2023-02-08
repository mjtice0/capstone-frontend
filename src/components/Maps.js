import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-paces-autocomplete";

//three props to google map, zoom, center (lat and long), style for container (in div)

//useStated for current location 

//useMemo hook to memoize results, prevent map from recenting itsself
const libraries = ["places"];
const mapContainerStyle = {
  width: "65vw",
  height: "60vh",
};
const center = 
{ lat: 43.45, lng: -80.49};

export default function Maps () {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API, libraries,
  });

  if (!isLoaded) return "Loading Maps";
  // return <Map />


// function Map() {
//   const center= useMemo(() => ({ lat: 43.45, lng: -80.49}), []);
//   const [selected, setSelected] = useState(null);
  
  return (
  
    <div>
      <GoogleMap zoom={12} center={center} mapContainerStyle={mapContainerStyle}
      >
      </GoogleMap>
    </div>
  );
}







  // const center = useMemo(() => ({
  //   lat: 43.45, lng: -80.49 }), []);
  // const [selected, setSelected] = useState(null);
  
// return (
//   <GoogleMap
//   zoom={12}
//   center={center}
//   mapContainer="map-container"
 
//   >
//   </GoogleMap>
//   );
// }
