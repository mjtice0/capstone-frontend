import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox,} from "@react-google-maps/api";
import "./Map.css";

//three props to google map, zoom, center (lat and long), style for container (in div)
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
  const [mapCenter, setMapCenter] = useState({
    lat: 39.742043,
    lng: -104.991531,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries,
  });

  const onPlacesChanged = () => {
    setMapCenter(newPlace?.getPlaces()[0]?.geometry.location);
    console.log(newPlace?.getPlaces()[0])
  };
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





 // if (!newPlace) return;
    // const places = newPlace.getPlaces();
    // console.log(places);
    // map.setCenter(places[0]?.geometry.location);


    // const mapRef = useRef();
// const onMapLoad = useCallback((map) => {
//   mapRef.current = map;
// } )
