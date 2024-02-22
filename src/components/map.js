"use client";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import { collection, query, where, getDocs } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { iso1A2Code } from "@rapideditor/country-coder";
import { db } from "./firestore";
import AwesomeMarkers from "leaflet.awesome-markers";
import Script from "next/script";
import { Spinner } from "@nextui-org/react";

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

export default function MapMenu({ lang, lat = null, long = null }) {
  const [location, setLocation] = useState(null);
  const [position, setPosition] = useState([]);
  const [pi, setpi] = useState(null);
  const [map, setMap] = useState(null);
  const [code, setcode] = useState(null);

  const piload = () => {
    window.Pi.init({
      version: "2.0",
      sandbox: process.env.NEXT_PUBLIC_APP_SANDBOX == "true" ? true : false,
    }).catch(function (error) {
      console.error(error);
      console.log("pi sdk failed");
    });
    if (lat == null || long == null) {
      if (
        navigator.userAgent.indexOf("Android") > -1 ||
        navigator.userAgent.indexOf("Adr") > -1
      ) {
        window.Pi.openUrlInSystemBrowser(
          process.env.NEXT_PUBLIC_USER_LOCATION_DOMAIN +
            lang +
            "/getuserlocation"
        );
      }
    }
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
          if (
            navigator.userAgent.indexOf("Android") > -1 ||
            navigator.userAgent.indexOf("Adr") > -1
          ) {
          } else {
            parent.window.location =
              process.env.NEXT_PUBLIC_USER_LOCATION_DOMAIN +
              lang +
              "/getuserlocation";
          }
        } else {
          const latitude = parseFloat(lat);
          const longitude = parseFloat(long);
          setLocation({
            latitude,
            longitude,
            countrycode: iso1A2Code([longitude, latitude]),
          });
          setcode(iso1A2Code([longitude, latitude]));
        }
      } else {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({
            latitude,
            longitude,
            countrycode: iso1A2Code([longitude, latitude]),
          });
          setcode(iso1A2Code([longitude, latitude]));
        });
      }
    }
  }, []);
  const markers = async (locate) => {
    if (locate == null) return;
    const shopRef = collection(db, "shop");
    const country = iso1A2Code([locate.longitude, locate.latitude]);
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
  function CheckCenter() {
    const map = useMapEvent("moveend", async () => {
      let locate = map.getCenter();
      console.log("new" + code);
      let c = iso1A2Code([locate.lng, locate.lat]);
      if (iso1A2Code([locate.lng, locate.lat]) != code) {
        setcode(iso1A2Code([locate.lng, locate.lat]));
      } else {
      }
    });
  }
  const updatemarker = async () => {
    const shopRef = collection(db, "shop");
    const q = query(shopRef, where("country", "==", code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
    } else {
      let temp = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        temp.push(data);
        console.log(data);
        setPosition(temp);
      });
    }
  };
  useEffect(() => {
    updatemarker();
  }, [code]);
  useEffect(() => {
    markers(location);
  }, [location]);
  useEffect(() => {
    console.log("update");
  }, [position]);
  const searchshop = () => {};
  if (location == null)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner color="warning" size="lg" />
        <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={piload}></Script>
      </div>
    ); //loading map

  return (
    <>
      <div className="fixed w-full z-10 h-12 top-0 mt-5 ">
        <Script
          src="https://kit.fontawesome.com/2b772bd246.js"
          crossOrigin="anonymous"
        />
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
        ref={setMap}
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
                icon={
                  item.type == "coffee"
                    ? coffeeicon
                    : item.type == "Restaurant"
                    ? restauranticon
                    : item.type == "Grocery"
                    ? bookstore
                    : item.type == "BookStore"
                    ? bookstore
                    : item.type == "Bakery"
                    ? bakery
                    : item.type == "Hotel"
                    ? hotelicon
                    : other
                }
                position={[item.latitude, item.longitude]}
              ></Marker>
            ))}
        <CheckCenter />
      </MapContainer>
    </>
  );
}

const coffeeicon = new L.AwesomeMarkers.icon({
  icon: "fa-mug-saucer",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7] fa-solid",
});
const restauranticon = new L.AwesomeMarkers.icon({
  icon: "fa-cutlery",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7]",
});
const grocery = new L.AwesomeMarkers.icon({
  icon: "fa-shopping-bag",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7]",
});
const bookstore = new L.AwesomeMarkers.icon({
  icon: "fa-book",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7]",
});
const bakery = new L.AwesomeMarkers.icon({
  icon: "fa-bread-slice",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7]",
});
const hotelicon = new L.AwesomeMarkers.icon({
  icon: "fa-bed",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7] fa-solid",
});
const other = new L.AwesomeMarkers.icon({
  icon: "fa-university",
  prefix: "fa",
  markerColor: "lightblue",
  iconColor: "white",
  extraClasses: "fill-[#8CA0D7]",
});
