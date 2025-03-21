"use client"

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import dynamic from "next/dynamic"


// Load component động để tránh lỗi SSR
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false })

// Custom icon cho marker
const waterQualityIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

function WaterQualityMap() {
  const position = [20.980598, 105.787902] // Tọa độ điểm đo

  return (
    <MapContainer center={position} zoom={15} style={{ height: "400px", width: "100%" }}>
      {/* Lớp nền bản đồ */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Điểm đo trên bản đồ */}
      <Marker position={position} icon={waterQualityIcon}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">📍 Water Quality: <span className="text-green-600">Normal</span></p>
            <p>💧 pH Level: <strong>7.2</strong></p>
            <p>🌡 Temperature: <strong>24.5°C</strong></p>
            <p>👀 Turbidity: <strong>1.2 NTU</strong></p>
            <p>🫧 Dissolved Oxygen: <strong>8.5 mg/L</strong></p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}


export default dynamic(() => Promise.resolve(WaterQualityMap), { ssr: false })
