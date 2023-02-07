import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  StandaloneSearchBox,
} from "@react-google-maps/api";

window.Places = function () {
  // const mapStyles = {
  //   height: "100vh",
  //   width: "100%"};

  // const defaultCenter = {
  //   lat: 39.7392, lng: -104.950050
  //

  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });

  const input = document.getElementById("pac-input");
  const searchBox = new window.google.maps.places.SearchBox(input);

  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new window.google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
};

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDPbahXMrfa37wb_ISDP3FFJ7z6n5H7BI&callback=Places" async defer></script>
// window.initAutocomplete = Places;

//   return (
//      <LoadScript
//        googleMapsApiKey="AIzaSyBDPbahXMrfa37wb_ISDP3FFJ7z6n5H7BI"
//        libraries={["places"]}
//        >

//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={defaultCenter}>
//              <input
//               type="text"
//               placeholder="search for"
//               style={{boxSizing: `border-box`,
//               border: `1px solid transparent`,
//               width: `240px`,
//               height: `32px`,
//               padding: `0 12px`,
//               borderRadius: `3px`,
//               boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//               fontSize: `14px`,
//               outline: `none`,
//               textOverflow: `ellipses`,
//               position: "absolute",
//               left: "50%",
//               marginLeft: "-120px"}}
//             />
//           </GoogleMap>
//      </LoadScript>
//   )
// }

export default window.Places;
