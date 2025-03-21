"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

// Sample water quality data for the location
const locationData = {
  id: "loc1",
  name: "Monitoring Station Alpha",
  coordinates: [20.980598122367738, 105.78790231932794] as [number, number],
  quality: "Normal",
  measurements: {
    pH: 7.2,
    temperature: 24.5,
    turbidity: 1.2,
    oxygen: 8.5,
    conductivity: 420,
  },
}

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center bg-muted/20">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

export function WaterQualityMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Locations</CardTitle>
        <CardDescription>Geographic view of water quality monitoring stations</CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        <div className="h-[400px] w-full">
          <MapComponent locationData={locationData} />
        </div>
      </CardContent>
    </Card>
  )
}

