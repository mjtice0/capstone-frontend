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

export default function Map({ onMarkerClick }) {
  const [map, setMap] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [marker, setMarker] = useState([]);
  const [placeDetails, setPlaceDetails] = useState({});
  const [mapCenter, setMapCenter] = useState({
    lat: 39.742043,
    lng: -104.991531,
  });

  //Goolge React Maps hook to load Google Maps Javascript API, specify key and library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries,
  });

  useEffect(() => {
    // simulate user click
    onMarkerClick?.({
      place: {
        placeID: "aaaaaaaaaa",
        placeName: "Denver Gardens",
      },
    });
  }, []);

  //Monitors changes to placeDetails and logs them in console.
  useEffect(() => {
    if (placeDetails) {
      console.log({ placeDetails });
    }
  }, [placeDetails]);

  //Called when user searches for a new place.
  //Retrieves the selected place and resets the map center to the selected place.
  //Place details object updates with the placeId and placeName.
  const onPlacesChanged = () => {
    const place = newPlace?.getPlaces()[0];
    const placeDetails = { placeName: place.name, placeID: place.place_id };
    // console.log(place)

    //Sets state for mapCenter and PlaceDetails when onPlacesChanged is called
    setMapCenter(place?.geometry.location);
    setPlaceDetails(placeDetails);
  };

  //Callback function that is passed as props to standalonesearchbox component. It is called whenever the search box has finished loading. Takes ref in reference to the search box.
  //Updates state with reference to what is searched in searchbox
  const onLoad = (ref) => {
    setNewPlace(ref);
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

//old states
//  // const [placeID, setPlaceID] = useState(null);
// const [placeName, setPlaceName] = useState(null);

// setPlaceID(placeId);
// setPlaceName(placeName)
