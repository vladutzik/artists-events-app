import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: Number(props.lat), lng: Number(props.lng) }}
  >
    <Marker
      position={{ lat: Number(props.lat), lng: Number(props.lng) }}
    />
  </GoogleMap>
)));

export default MapWithAMarker;