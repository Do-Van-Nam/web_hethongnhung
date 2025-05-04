"use client"

import { useEffect, useState, useRef } from "react"

// Define the props interface
interface MapComponentProps {
  locationData: {
    id: string
    name: string
    coordinates: [number, number]
    quality: string
    measurements: {
      pH: number
      temperature: number
      turbidity: number
      oxygen: number
      conductivity: number
      solids: number
    }
  }
}

// Define a global window interface to access Leaflet
declare global {
  interface Window {
    L: any
  }
}

export default function MapComponent({ locationData }: MapComponentProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef<any>(null)
  const mapInitializedRef = useRef(false)

  useEffect(() => {
    // Function to load Leaflet scripts and CSS
    const loadLeaflet = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if Leaflet is already loaded
        if (window.L) {
          resolve()
          return
        }

        // Load Leaflet CSS
        const linkElement = document.createElement("link")
        linkElement.rel = "stylesheet"
        linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        linkElement.crossOrigin = ""
        document.head.appendChild(linkElement)

        // Load Leaflet JS
        const scriptElement = document.createElement("script")
        scriptElement.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        scriptElement.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        scriptElement.crossOrigin = ""
        scriptElement.onload = () => resolve()
        scriptElement.onerror = () => reject(new Error("Failed to load Leaflet"))
        document.head.appendChild(scriptElement)
      })
    }

    // Initialize the map
    const initializeMap = async () => {
      try {
        // Load Leaflet if not already loaded
        await loadLeaflet()

        // Prevent multiple initializations
        if (mapInitializedRef.current) return
        mapInitializedRef.current = true

        // Get the map container
        const mapContainer = document.getElementById("map")
        if (!mapContainer) return

        // Initialize the map
        const L = window.L
        mapRef.current = L.map("map").setView(locationData.coordinates, 15)

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current)

        // Create custom popup content
        const popupContent = document.createElement("div")
        popupContent.className = "p-2"
        popupContent.innerHTML = `
          <h3 class="font-semibold text-base">${locationData.name}</h3>
          <p class="text-xs text-muted-foreground mb-2">
            ${locationData.coordinates[0].toFixed(6)}, ${locationData.coordinates[1].toFixed(6)}
          </p>
          <div class="space-y-2 mt-3">
            
            <div class="flex items-center gap-2">
              <span class="text-sm">Turbidity: <span class="font-medium">${locationData.measurements.turbidity} NTU</span></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">Dissolved Solids: <span class="font-medium">${locationData.measurements.solids} ppm</span></span>
            </div>
          </div>
        `

        // Create custom tooltip content
        const tooltipContent = document.createElement("div")
        tooltipContent.className = "text-xs font-medium"
        const qualityColors = {
          bad: {
            bg: "bg-red-50",
            text: "text-red-700",
            border: "border-red-200",
          },
          fair: {
            bg: "bg-yellow-50",
            text: "text-yellow-700",
            border: "border-yellow-200",
          },
          good: {
            bg: "bg-green-50",
            text: "text-green-700",
            border: "border-green-200",
          },
        }

        const qualityStyles = qualityColors[locationData.quality] || qualityColors.fair // Default to 'fair' if quality is unknown
        tooltipContent.innerHTML = `
          Quality: <span class="ml-1 px-1.5 py-0.5 rounded-sm ${qualityStyles.bg} ${qualityStyles.text} ${qualityStyles.border}">
            ${locationData.quality.toLocaleUpperCase()}
          </span>
        `

        const markerIcon = window.L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41], // Kích thước icon
            iconAnchor: [12, 41], // Điểm neo icon
            popupAnchor: [1, -34], // Vị trí popup
            shadowSize: [41, 41], // Kích thước bóng
          });
        // Add marker with popup and tooltip
        const marker = L.marker(locationData.coordinates, { icon: markerIcon })
          .addTo(mapRef.current)
          .bindPopup(popupContent)
          .bindTooltip(tooltipContent, { permanent: true, direction: "top", offset: [0, -20], opacity: 1 })

        setIsMapLoaded(true)
      } catch (error) {
        console.error("Error loading map:", error)
      }
    }

    initializeMap()

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapInitializedRef.current = false
      }
    }
  }, [locationData])

  return (
    <div id="map" className="h-full w-full">
      {!isMapLoaded && (
        <div className="h-full w-full flex items-center justify-center bg-muted/20">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      )}
    </div>
  )
}


{/* <div class="flex items-center gap-2">
              <span class="text-sm">pH: <span class="font-medium">${locationData.measurements.pH}</span></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">Temperature: <span class="font-medium">${locationData.measurements.temperature}°C</span></span>
            </div> */}