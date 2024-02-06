import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "public/marker.png";
import "leaflet/dist/leaflet.css";

function CustomMap({ param1, param2 }) {
  const center = [Number(param1), Number(param2)];

  let DefaultIcon = L.icon({
    iconUrl: markerIcon,
  });

  return (
    <div>
      <div>
        <MapContainer
          center={center}
          zoom={18}
          scrollWheelZoom={false}
          style={{ width: "40%", height: "50vh" }}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <Marker position={center} icon={DefaultIcon}>
            <Popup>{center}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default CustomMap;
