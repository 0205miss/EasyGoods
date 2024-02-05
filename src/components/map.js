'use client'
import {
  MapContainer,
  Marker,
  TileLayer
} from "react-leaflet";
import { collection, query, where, getDocs } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { iso1A2Code } from '@rapideditor/country-coder';
import { db } from "./firestore";

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
  const [position, setPosition] = useState([])

  useEffect(()=>{
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude,countrycode:iso1A2Code([longitude,latitude]) });
        })
  }
  },[])
  const markers = async() =>{
    if(location==null) return
    const shopRef = collection(db, "shop");
    const country = iso1A2Code([location.longitude,location.latitude])
    const q = query(shopRef, where("country", "==", country));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching documents.');
    }else{
      querySnapshot.forEach(doc => {
        let data = doc.data()
        setPosition([...position,data])
      });
    }
    }
  useEffect(()=>{
    markers()
  },[location])

    const searchshop = () =>{}
  if(location==null) return //loading map
  console.log(position)
  return (
    <>
      <div className="fixed w-full z-[1000] h-12 top-0 mt-5 ">
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
        className="w-full h-full"
        center={[location.latitude, location.longitude]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]} icon={iconPerson}></Marker>
        {position.length==0 ? null :position.map((item)=><Marker key={item.name} position={[item.latitude,item.longitude]}></Marker>)}
      </MapContainer>
    </>
  );
}