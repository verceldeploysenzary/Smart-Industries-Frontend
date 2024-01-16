import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

function CustomMap() {
  const center = [-34.61315, -58.37723];

  const defaultMarkerIcon = new L.Icon({
    iconSize: [50, 50],
    popupAnchor: [3, -46],
  });

  return (
    <div>
      <div>
        <MapContainer
          className="map-container"
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          style={{ width: "90vw", height: "90vh" }}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default CustomMap;
