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
  height: "60vh",
  border: `3px solid black`,
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

  // This callback is called when the searchBox instance has loaded.
  const onLoadSearchBox = (searchBoxInstance) => {
    setSearchBox(searchBoxInstance);
  };

  const handleApiLoaded = (map, maps) => {
    // Set the z-index of the map element
    const mapEl = map.getDiv();
    mapEl.style.zIndex = 1;
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
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <>
            <div className="search-box">
              {/* <i class="fa-solid fa-magnifying-glass"></i> */}
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
