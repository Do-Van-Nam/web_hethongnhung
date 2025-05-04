"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function WaterQualityChart({ historical = false }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Initial data fetch
    fetchLatestData()

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      fetchLatestData()
    }, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [historical])

  const fetchLatestData = async () => {
    try {
      const response = await fetch('https://api-iot-kappa.vercel.app/api/latest')
      const latestData = await response.json()
      
      setData(prevData => {
        // Create a new array with the previous data
        const newData = [...prevData]
        
        // Add the new data point
        // Get the current time for timestamps
        const now = new Date();
        const timeString = now.toLocaleTimeString(); // Format: HH:MM:SS
        const fullTimeString = now.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS
        newData.unshift({
          time: timeString,
          fullTime: fullTimeString,
          turbidity: latestData.NTU,
          tds: latestData.TDS,
          position: latestData.position,
          status: latestData.status,
          x: latestData.x,
          y: latestData.y
        })
        
        // Sort the data so that the most recent entries come first
        newData.sort((a, b) => new Date(b.fullTime) - new Date(a.fullTime))
        // Keep only the last 8 data points for real-time view
        if (!historical && newData.length > 8) {
          return newData.slice(0, 8)
        }
        
        // Keep last 24 hours for historical view
        if (historical && newData.length > 168) { // 24 * 7 = 168 for a week
          return newData.slice(0, 168)
        }
        
        return newData
      })
    } catch (error) {
      console.error("Error fetching water quality data:", error)
    }
  }
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={historical ? "fullTime" : "time"}
            tick={{ fontSize: 12 }}
            interval={historical ? Math.floor(data.length / 10) : "preserveEnd"}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="turbidity"
            stroke="#eab308"
            name="Turbidity (NTU)"
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tds"
            stroke="#10b981"
            name="Total Dissolved Solids (TDS)"
            activeDot={{ r: 8 }}

            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
