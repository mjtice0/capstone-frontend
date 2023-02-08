import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-paces-autocomplete";

//three props to google map, zoom, center (lat and long), style for container (in div)

//useStated for current location 

//useMemo hook to memoize results, prevent map from recenting itsself
const libraries = ["places"];
const mapContainerStyle = {
  width: "65vw",
  height: "60vh",
};
const center = { lat: 43.45, lng: -80.49};

export default function Maps () {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API, libraries,
  });

  const [pins, setPins] = useState([]);
  const [searchBox, setSearchBox] = useState(null);

  const onPlaceChange = () => console.log(searchBox.getPlaces())
  const onSearchBoxLoad = ref => {
    setSearchBox(ref);
  }
  
  if (!isLoaded) return "Loading Maps";
  // return <Map />


// function Map() {
//   const center= useMemo(() => ({ lat: 43.45, lng: -80.49}), []);
//   const [selected, setSelected] = useState(null);
  
  return (
    <div>
      <GoogleMap 
        zoom={12} 
        center={center} 
        mapContainerStyle={mapContainerStyle}
        onClick={(event) => {
          setPins(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }])
        }}
      >
        <>
          <StandaloneSearchBox
          onPlaceChange={onPlaceChange}
          onLoad={onSearchBoxLoad}
          >
            <input type="text"
            placeholder="Search for Place (e.g. restaurant)"
            style={{
              boxSizing:'border-box',
              border: `2px solid green`,
              width: `270px`,
              height: `38px`,
              borderRadius: `3px`,
              fontSize: `16px`,
              outline: `none`,
              margin: 'center',
              textOverflow: `ellipses`,
              position: 'absolute',
              top: '40px',
              marginLeft: '50%'
            }}
            />
          </StandaloneSearchBox>
        </>
      </GoogleMap>
    </div>
  );
}






