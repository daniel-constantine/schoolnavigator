import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { calculateOverallRating, getRatingClass } from "../utils";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { MAP_CENTER, MAP_ZOOM } from "../constants";
import "./Map.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Map = ({ filteredSchools, center = MAP_CENTER }) => {
  const schoolLocations = React.useMemo(
    () =>
      filteredSchools.map((school) => ({
        ...school,
        position: [school?.latitude || 0, school?.longitude || 0],
      })),
    [filteredSchools],
  );

  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={MAP_ZOOM}
        style={{ height: "100%", width: "100%" }}
        data-testid="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schoolLocations.map((school, index) => {
          const url = `/school/${school.dbn}`;
          const overallRating = calculateOverallRating(school);
          const fillColor = getRatingClass(overallRating);
          return (
            <CircleMarker
              key={school.dbn ?? index}
              center={school.position}
              radius={10}
              pathOptions={{
                color: "white",
                fillColor,
                fillOpacity: 1,
              }}
            >
              <Popup>
                <div>
                  <h3>{school.name}</h3>
                  <div>DBN: {school.dbn}</div>
                  <div>Address: {school.address}</div>
                  <div>
                    District {school.district} | {school.grade_band}
                  </div>
                  <div>
                    <strong>Overall Score: {overallRating ?? "N/A"}</strong>
                  </div>
                  <Link
                    to={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    <button type="button" style={{ padding: "0.25rem" }}>
                      View Detail
                    </button>
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
