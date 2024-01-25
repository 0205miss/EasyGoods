import { MapContainer,Marker,TileLayer,Tooltip, ZoomControl } from "react-leaflet";
import { useMap } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css"
import { useEffect,useState } from "react";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'https://svgshare.com/i/12NF.svg',
    iconRetinaUrl: 'https://svgshare.com/i/12NF.svg',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
});

export default function MapMenu(){
    return <MapContainer zoomControl={false} attributionControl={false} className="w-full h-full" center={[51.505, -0.09]} zoom={16} scrollWheelZoom={false}>
        <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    <UserLocationMarker />
    </MapContainer>
}
function Mapchild(){
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}
function UserLocationMarker(){
    const [position,setPosition] = useState(null)
    const map = useMap()
    useEffect(()=>{
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
          });
          map.on("locationerror",function(e){
            alert(e.message)
          })
    },[map])
    return position ===null ? null : (
        <Marker position={position} icon={iconPerson}>

        </Marker>
    )
}