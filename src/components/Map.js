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
  width: "70vw",
  height: "64vh",
  border: `3px solid white`,
};

const searchBoxStyle = {
  boxSizing: "border-box",
  border: `2px solid black`,
  padding: "20px",
  width: `400px`,
  height: `55px`,
  borderRadius: `10px`,
  fontSize: `20px`,
  fontWeight: "bold",
  margin: "center",
  position: "absolute",
  top: "30px",
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries,
  });

  const onPlacesChanged = () => {
    if (!searchBox) return; //

    const places = searchBox.getPlaces();
    console.log({ places });

    setMapCenter(places?.[0].geometry.location);

    markers.forEach((marker) => {
      marker.setMap(null);
    });

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
            <div className="search-box">
              <StandaloneSearchBox
                onPlacesChanged={onPlacesChanged}
                onLoad={onLoadSearchBox}
              >
                <input
                  type="search"
                  className="searchbox"
                  placeholder="Search for Place"
                  style={searchBoxStyle}
                />
              </StandaloneSearchBox>
            </div>
          </>
        </GoogleMap>
      </div>
    </div>
  );
}
