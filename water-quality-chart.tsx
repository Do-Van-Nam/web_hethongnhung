"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data - in a real application, this would come from your API
const generateData = (hours = 24, historical = false) => {
  const data = []
  const now = new Date()
  const startTime = historical
    ? new Date(now.getTime() - hours * 60 * 60 * 1000)
    : new Date(now.getTime() - 8 * 60 * 60 * 1000)

  for (let i = 0; i < (historical ? hours : 8); i++) {
    const time = new Date(startTime.getTime() + i * 60 * 60 * 1000)

    // Create some realistic variations in the data
    const baseTemp = 24
    const basePh = 7.2
    const baseTurbidity = 1.5
    const baseOxygen = 8.0

    // Add some randomness and trends
    const hourFactor = (i % 24) / 24
    const randomFactor = Math.random() * 0.4 - 0.2

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fullTime: historical
        ? time.toLocaleDateString() + " " + time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : null,
      temperature: +(baseTemp + Math.sin(hourFactor * Math.PI * 2) * 1.5 + randomFactor).toFixed(1),
      pH: +(basePh + Math.sin(hourFactor * Math.PI * 2) * 0.3 + randomFactor * 0.2).toFixed(1),
      turbidity: +(baseTurbidity + Math.cos(hourFactor * Math.PI * 2) * 0.5 + randomFactor * 0.3).toFixed(1),
      oxygen: +(baseOxygen + Math.sin(hourFactor * Math.PI * 2) * 0.8 + randomFactor * 0.4).toFixed(1),
    })
  }

  return data
}

export function WaterQualityChart({ historical = false }) {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateData(historical ? 168 : 24, historical))

    // In a real application, you would fetch data from your API here
    if (!historical) {
      const interval = setInterval(() => {
        setData((prev) => {
          const newData = [...prev]
          // Remove oldest data point and add a new one
          newData.shift()

          const lastTime = new Date()
          const baseTemp = 24
          const basePh = 7.2
          const baseTurbidity = 1.5
          const baseOxygen = 8.0

          const hourFactor = (lastTime.getHours() % 24) / 24
          const randomFactor = Math.random() * 0.4 - 0.2

          newData.push({
            time: lastTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            temperature: +(baseTemp + Math.sin(hourFactor * Math.PI * 2) * 1.5 + randomFactor).toFixed(1),
            pH: +(basePh + Math.sin(hourFactor * Math.PI * 2) * 0.3 + randomFactor * 0.2).toFixed(1),
            turbidity: +(baseTurbidity + Math.cos(hourFactor * Math.PI * 2) * 0.5 + randomFactor * 0.3).toFixed(1),
            oxygen: +(baseOxygen + Math.sin(hourFactor * Math.PI * 2) * 0.8 + randomFactor * 0.4).toFixed(1),
          })

          return newData
        })
      }, 60000) // Update every minute

      return () => clearInterval(interval)
    }
  }, [historical])

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
            dataKey="temperature"
            stroke="#f97316"
            name="Temperature (°C)"
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="left" type="monotone" dataKey="pH" stroke="#0ea5e9" name="pH" dot={false} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="turbidity"
            stroke="#eab308"
            name="Turbidity (NTU)"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="oxygen"
            stroke="#10b981"
            name="Dissolved Oxygen (mg/L)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

