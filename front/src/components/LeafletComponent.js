import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

import iconUrl from "../assets/client.png";
import companyIconUrl from "../assets/company.png";

const customIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
});

const companyIcon = L.icon({
  iconUrl: companyIconUrl,
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
});

export default function Leaflet({ clients }) {
  return (
    <MapContainer center={[-23.600104, -46.720295]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[-23.600104, -46.720295]} icon={companyIcon}>
        <Popup></Popup>
      </Marker>

      {clients.length !== 0 ? (
        <>
          {clients.map((marker) => (
            <Marker
              position={[marker.latitude, marker.longitude]}
              icon={customIcon}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}

          <Polyline
            positions={[
              [-23.600104, -46.720295],
              [clients[0].latitude, clients[0].longitude],
            ]}
            color="blue"
          />

          <Polyline
            positions={clients.map((marker) => [
              marker.latitude,
              marker.longitude,
            ])}
            color="blue"
          />
        </>
      ) : null}
    </MapContainer>
  );
}
