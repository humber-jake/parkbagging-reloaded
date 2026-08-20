import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Routing from "./Routing";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Park } from "../types/Park";
import "../styles/index.css";

interface ParkMapProps {
  park1: Park;
  park2: Park;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const park1Icon = L.divIcon({
  html: "1️⃣",
  className: "emoji-marker",
  iconSize: [20, 20],
  iconAnchor: [20, 20],
});
const park2Icon = L.divIcon({
  html: "2️⃣",
  className: "emoji-marker",
  iconSize: [20, 20],
  iconAnchor: [20, 20],
});

export default function Map({ park1, park2 }: ParkMapProps) {
  return (
    <MapContainer
      className="park-map"
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={true}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
    >
      <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" />

      <Marker position={[park1.googlemapdest.lat, park1.googlemapdest.lon]} />

      <Marker position={[park2.googlemapdest.lat, park2.googlemapdest.lon]} />

      <Routing park1={park1} park2={park2} />
    </MapContainer>
  );
}
