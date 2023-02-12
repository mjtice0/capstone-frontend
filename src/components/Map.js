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

  useEffect(() => {
    // simulate user click
    onMarkerClick?.({
      place: {
        placeID: "aaaaaaaaaa",
        placeName: "Denver Gardens",
      },
    });
  }, []);

  /* No longer needed */
  // //Monitors changes to placeDetails and logs them in console.
  // useEffect(() => {
  //   if (placeDetails) {
  //     console.log({ placeDetails });
  //   }
  // }, [placeDetails]);

  // https://react-google-maps-api-docs.netlify.app/#standalonesearchbox
  const onPlacesChanged = () => {
    if (!searchBox) return; // ensure searchBox is loaded/ready

    const places = searchBox.getPlaces();
    console.log({ places });

    // Center map on first result
    setMapCenter(places?.[0].geometry.location);

    // clear existing markers
   
    markers.forEach((marker, index) => {
      markers[index] = null;
    })
     
    
    
    // TODO


    // add new Markers with click event that calls onMarkerClick?.(data)
    setMarkers(
      places.map((place) => {
        return new window.google.maps.Marker({
          map,
          position: place.geometry.location,
        });
      })
    );

    /* not needed */
    // const place = newPlace?.getPlaces()[0];
    // const placeDetails = { placeName: place.name, placeID: place.place_id };
    // console.log(place)
    // setPlaceDetails(placeDetails);
  };

  // https://react-google-maps-api-docs.netlify.app/#standalonesearchbox
  // This callback is called when the searchBox instance has loaded.
  const onLoadSearchBox = (searchBoxInstance) => {
    setSearchBox(searchBoxInstance);
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
