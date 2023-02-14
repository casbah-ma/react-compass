import Map, { Marker, GeolocateControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY29tZXBpYyIsImEiOiJjbGJwaGhvbmcwNHJjM3BwOW1hZXFwY2E3In0.VCNQYlo9n0ZodfebeSNjQA";

function MapComponent({ latitude, longitude }) {
  return (
    <Map
      latitude={latitude}
      longitude={longitude}
      zoom={14}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/comepic/cl93hft2w00fw15mvav9k1l1n"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
      <GeolocateControl />
    </Map>
  );
}

export default MapComponent;
