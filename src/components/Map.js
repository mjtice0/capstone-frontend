import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
  Data,
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
  const [markers, setMarkers] = useState([]);
  const [searchBox, setSearchBox] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 39.742043,
    lng: -104.991531,
  });

  //Goolge React Maps hook to load Google Maps Javascript API, specify key and library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries,
  });

  // https://react-google-maps-api-docs.netlify.app/#standalonesearchbox
  const onPlacesChanged = () => {
    if (!searchBox) return; // ensure searchBox is loaded/ready

    const places = searchBox.getPlaces();
    console.log({ places });

    // Center map on first result
    setMapCenter(places?.[0].geometry.location);

    // clear existing markers
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    // add new Markers with click event that calls onMarkerClick?.(data)
    setMarkers(
      places.map((place) => {
        const marker = new window.google.maps.Marker({
          map,
          position: place.geometry.location,
        });

        marker.addListener("click", () => {
          console.log("clicked", place.name);
          onMarkerClick({
            place: {
              placeId: place.place_id,
              placeName: place.name,
            },
          });
        });
      })
    );
  };

  // https://react-google-maps-api-docs.netlify.app/#standalonesearchbox
  // This callback is called when the searchBox instance has loaded.
  const onLoadSearchBox = (searchBoxInstance) => {
    setSearchBox(searchBoxInstance);
  };

  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map-container">
      <div className="map">
      <GoogleMap
        zoom={12}
        center={mapCenter}
        mapContainerStyle={mapContainerStyle}
        onLoad={(map) => setMap(map)}
      >
        <>
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onLoadSearchBox}
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
    </div>
  );
}
