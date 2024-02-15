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
import AwesomeMarkers from "leaflet.awesome-markers";

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
  extraClasses:'fill-[#8CA0D7]'
})
export default function MapMenu() {
  const [location,setLocation] = useState(null)
  const [position, setPosition] = useState([])

  useEffect(()=>{
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      if (
        window.location.ancestorOrigins[0] == "https://sandbox.minepi.com" ||
        window.location.ancestorOrigins[0] == "https://app-cdn.minepi.com"
      ) {
        setLocation({ latitude:23.553118, longitude:121.0211024,countrycode:'TW' });
      }else{
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude,countrycode:iso1A2Code([longitude,latitude]) });
        })
      }
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
      <div className="fixed w-full z-10 h-12 top-0 mt-5 ">
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
        <Marker position={[location.latitude, location.longitude]} icon={iconPerson}></Marker>
        {position.length==0 ? null :position.map((item)=><Marker key={item.name} icon={testicon} position={[item.latitude,item.longitude]}></Marker>)}
      </MapContainer>
    </>
  );
}