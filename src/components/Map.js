import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import "./Map.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "60vw",
  height: "60vh",
  border: `2px solid #274A82`,
};

const searchBoxStyle = {
  boxSizing: "border-box",
  border: `2px solid #274A82`,
  padding: "10px",
  width: `300px`,
  height: `42px`,
  borderRadius: `6px`,
  fontSize: `18px`,
  margin: "center",
  position: "absolute",
  top: "20px",
  marginLeft: "30%",
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [marker, setMarker] = useState([]);
  const [placeID, setPlaceID] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 39.742043,
    lng: -104.991531,
  });

  const [placeName, setPlaceName] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries,
  });
//run in response to change in place id value, when place name changes useEffect will run
  useEffect(() => {
    if (placeID) {
      console.log({ placeID });
    }
  }, [placeID]);
// run in response to change in place name, when place name changes useEffect will run
  useEffect(() => {
    if (placeName) {
      console.log({ placeName });
    }
  }, [placeName]);


  const onPlacesChanged = () => {
    const place = newPlace?.getPlaces()[0];
    // console.log(place)
    const placeName = place.name
    const placeId = place.place_id;

//set state 
    setMapCenter(place?.geometry.location);
    setPlaceID(placeId);
    setPlaceName(placeName)
  };
  const onLoad = (ref) => {
    setNewPlace(ref);
    console.log(newPlace)
    console.log(placeName)
  };

  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map-container">
      <GoogleMap
        zoom={12}
        center={mapCenter}
        mapContainerStyle={mapContainerStyle}
        onLoad={(map) => setMap(map)}
      >
        <>
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onLoad}
          >
            <input
              type="text"
              className="searchbox"
              placeholder="Search for Place"
              style={searchBoxStyle}
            />
          </StandaloneSearchBox>
        </>
      </GoogleMap>
    </div>
  );
}

// onClick={(event) => {
//   setMarkers((current) => [
//     ...current,
//     {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//       time: new Date(),
//     },

// {markers.map((marker) => (
//   <Marker
//     key={marker.time.toISOString}
//     position={{ lat: marker.lat, lng: marker.lng }}
//   />
// ))}

// setMarker(newPlace?.getPlaces()[0].geometry.location)
// setPlaceID(newPlace?.getPlaces()[0].place_id)

// if (!newPlace) return;
// const places = newPlace.getPlaces();
// console.log(places);
// map.setCenter(places[0]?.geometry.location);

// const mapRef = useRef();
// const onMapLoad = useCallback((map) => {
//   mapRef.current = map;
// } )


  // const onPlacesChanged = () => {
  //  if (!newPlace) return;
  //   const places = newPlace.getPlaces();
  //   // console.log(places[0].place_id);
  //   map.setCenter(places[0]?.geometry.location);

  // }