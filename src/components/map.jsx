'use client'
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";

const iconPerson = new L.Icon({
  iconUrl: "https://svgshare.com/i/12NF.svg",
  iconRetinaUrl: "https://svgshare.com/i/12NF.svg",
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 60),
});

export default function MapMenu() {
  const [location,setLocation] = useState(null)
  useEffect(()=>{
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
      })
  }
  },[])
    const searchshop = () =>{}
  if(location==null) return //loading map
  return (
    <>
      <div className="fixed w-full z-[1000] h-12 top-0 mt-5">
          <div className="mx-5 h-full">
          <input
            className="w-full bg-white h-full rounded shadow-lg px-5 ring-offset-2 ring-2 ring-indigo-600"
            placeholder="Search"
            autoComplete="on"
            onSubmit={searchshop}
          />
          </div>
      </div>
      <MapContainer
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
        center={[location.latitude, location.longitude]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]} icon={iconPerson}></Marker>
      </MapContainer>
    </>
  );
}