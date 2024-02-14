import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import AwesomeMarkers from "leaflet.awesome-markers";
import "leaflet/dist/leaflet.css";
const centericon = new L.AwesomeMarkers.icon({
  icon: "fa-shopping-bag",
  prefix: "fa",
  markerColor: "darkblue",
  iconColor: "white",
});

export default function MapCheck({ lat, long }) {
  return (
    <MapContainer
      zoomControl={false}
      attributionControl={false}
      className="!w-full !h-full"
      center={[lat, long]}
      zoom={17}
      tap={false}
      dragging={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[lat, long]} icon={centericon}></Marker>
    </MapContainer>
  );
}
