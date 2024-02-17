"use client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { collection, query, where, getDocs } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { iso1A2Code } from "@rapideditor/country-coder";
import { db } from "./firestore";
import AwesomeMarkers from "leaflet.awesome-markers";
import Script from "next/script";

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
const testicon = new L.AwesomeMarkers.icon({
  icon: "fa-university",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7]",
});
export default function MapMenu({ lang, lat = null, long = null }) {
  const [location, setLocation] = useState(null);
  const [position, setPosition] = useState([]);
  const [pi, setpi] = useState(null);

  const piload = () => {
    window.Pi.init({
      version: "2.0",
      sandbox: process.env.NEXT_PUBLIC_APP_SANDBOX == "true" ? true : false,
    }).catch(function (error) {
      console.error(error);
      console.log("pi sdk failed");
    });
    setpi(window.Pi);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      if (
        window.location.ancestorOrigins[0] == "https://sandbox.minepi.com" ||
        window.location.ancestorOrigins[0] == "https://app-cdn.minepi.com" ||
        window.location.ancestorOrigins[0] == "https://easygoods5604.pinet.com"
      ) {
        if (lat == null || long == null) {
          pi.openUrlInSystemBrowser(
            process.env.NEXT_PUBLIC_USER_LOCATION_DOMAIN +
              lang +
              "/getuserlocation"
          );
        } else {
          const latitude = parseFloat(lat);
          const longitude = parseFloat(long);
          setLocation({
            latitude,
            longitude,
            countrycode: iso1A2Code([longitude, latitude]),
          });
        }
      } else {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({
            latitude,
            longitude,
            countrycode: iso1A2Code([longitude, latitude]),
          });
        });
      }
    }
  }, []);
  const markers = async () => {
    if (location == null) return;
    const shopRef = collection(db, "shop");
    const country = iso1A2Code([location.longitude, location.latitude]);
    const q = query(shopRef, where("country", "==", country));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
    } else {
      let temp = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        temp.push(data);
      });
      setPosition(temp);
    }
  };
  useEffect(() => {
    markers();
  }, [location]);
  const searchshop = () => {};
  if (location == null) return; //loading map

  return (
    <>
      <div className="fixed w-full z-10 h-12 top-0 mt-5 ">
        <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={piload}></Script>
        <div className="mx-5 h-full ">
          <input
            className="w-full h-full rounded bg-[#C7CEE9] ring-offset-[#C7CEE9] placeholder:text-ui-accent shadow-lg px-5 ring-offset-2 ring-2 ring-ui-accent"
            placeholder="Search"
            autoComplete="on"
            onSubmit={searchshop}
          />
        </div>
      </div>
      <MapContainer
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full !z-0"
        center={[location.latitude, location.longitude]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[location.latitude, location.longitude]}
          icon={iconPerson}
        ></Marker>
        {position.length == 0
          ? null
          : position.map((item) => (
              <Marker
                key={item.name}
                icon={testicon}
                position={[item.latitude, item.longitude]}
              ></Marker>
            ))}
      </MapContainer>
    </>
  );
}
