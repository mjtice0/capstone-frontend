import { useState, useRef, useCallback , useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import "./map.css";

//three props to google map, zoom, center (lat and long), style for container (in div)
const libraries = ["places"];
const mapContainerStyle = {
  width: "60vw",
  height: "60vh",
  border: `2px solid #274A82`
};

const searchBoxStyle = {
  boxSizing:'border-box',
  border: `2px solid #274A82`,
  padding: '10px',
  width: `300px`,
  height: `42px`,
  borderRadius: `6px`,
  fontSize: `18px`,
  margin: 'center',
  position: 'absolute',
  top: '20px',
  marginLeft: '30%'
}
const center = { lat: 39.742043, lng: -104.991531};


export default function Map () {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API, libraries,
  });

  const[userLat, setUserLat] = useState();
  const[userLong, setUserLong] = useState();
  const [map, setMap] = useState(null)

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(position =>{
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
      console.log(userLat, userLong);
    })
  },[]);


  const [markers, setMarkers] = useState([]);
  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => console.log(searchBox.getPlaces())
  // const onLoad = ref => {
  //   setSearchBox(ref);
  // }

  //save reference to map, usestate to rerender, useref to not rerender
  // const mapRef = useRef();
  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // } )

  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map-container">
      <GoogleMap 
        zoom={12} 
        center={center} 
        mapContainerStyle={mapContainerStyle}
        onLoad={map=>setMap(map)}
        onClick={(event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }])
        }}
      >
        {markers.map(marker => <Marker key={marker.time.toISOString}
         position={{lat: marker.lat, lng: marker.lng}} /> )}
        <>
          <StandaloneSearchBox
          onPlacesChanged={onPlacesChanged}
          // onLoad={onLoad}
          >
            <input type="text"
            className="searchbox"
            placeholder="Search for Place (e.g. restaurant)"
            style={searchBoxStyle}
            />
          </StandaloneSearchBox>
        </>
      </GoogleMap>
    </div>
  );
}






