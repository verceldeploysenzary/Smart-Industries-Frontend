import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function CustomMap({ param1, param2 }) {
  const center = [Number(param1), Number(param2)];

  const ver = () => {
    console.log(Number(param1), Number(param2));
  };


  return (
    <div>
      <button onClick={() => ver()}>VER</button>

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
          <Marker 
          position={center}
          >
            <Popup>{center}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default CustomMap;
