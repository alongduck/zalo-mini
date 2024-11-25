import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon issue with Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Define props for the MapView component
interface MapViewProps {
  latitude?: number; // Optional latitude coordinate
  longitude?: number; // Optional longitude coordinate
  address?: string; // Optional address to display in the popup
  zoom?: number; // Zoom level (default: 15)
}

// Helper component to set map center and zoom
const SetMapView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// MapView Component
const MapView: React.FC<MapViewProps> = ({
  latitude = 10.7769, // Default latitude (e.g., Ho Chi Minh City)
  longitude = 106.7009, // Default longitude
  address = "Vị trí mặc định: Ho Chi Minh City, Vietnam", // Default address
  zoom = 15,
}) => {
  const center: [number, number] = [latitude, longitude];

  return (
    <MapContainer
      style={{ height: "300px", width: "100%", borderRadius: "8px" }}
    >
      <SetMapView center={center} zoom={zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
