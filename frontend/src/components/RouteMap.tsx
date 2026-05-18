import {
  MapContainer,
  TileLayer,
  Polyline
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function RouteMap({ coordinates }: any) {

  if (!coordinates.length) return null;

  return (
    <div style={{ height: "500px", width: "100%" }}>

      <MapContainer
        center={coordinates[0]}
        zoom={5}
        style={{
          height: "100%",
          width: "100%"
        }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={coordinates} />

      </MapContainer>

    </div>
  );
}