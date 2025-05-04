"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Download, AlertCircle } from "lucide-react"

// Fetch data from the API
import { useEffect } from "react"

// Define the type for our measurement data
interface Measurement {
  id: string;
  timestamp: string;
  // pH: number;
  // temperature: number;
  NTU: number;
  TDS: number;
  // conductivity: number;
  status: "fair" | "bad" | "good";
}
export function WaterQualityTable() {
  const [data, setData] = useState<Measurement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api-iot-kappa.vercel.app/api/history')
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        const result = await response.json() 
        const parseCustomDate = (timestamp) => {
          const [time, date] = timestamp.split(" ")
          const [hour, minute, second] = time.split(":").map(Number)
          const [day, month, year] = date.split("/").map(Number)
          return new Date(year, month - 1, day, hour, minute, second)
        }
        
        // Sort data by timestamp in descending order
        const sortedData = result.sort((a, b) => parseCustomDate(b.timestamp) - parseCustomDate(a.timestamp))
        setData(sortedData)
      } catch (err) {
        setError('Failed to fetch data. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const getStatusBadge = (status) => {
    switch (status) {
      case "fair":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Fair
          </Badge>
        )
      case "good":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Good
          </Badge>
        )
      case "bad":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Bad
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            {/* <TableHead>pH</TableHead>
            <TableHead>Temperature (°C)</TableHead> */}
            <TableHead>Turbidity (NTU)</TableHead>
            <TableHead>Dissolved Oxygen (mg/L)</TableHead>
            {/* <TableHead>Conductivity (μS/cm)</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((measurement) => (
            <TableRow key={measurement.id}>
              <TableCell className="font-medium">{measurement.timestamp}</TableCell>
              {/* <TableCell>{measurement.pH}</TableCell>
              <TableCell>{measurement.temperature}</TableCell> */}
              <TableCell>{measurement.NTU}</TableCell>
              <TableCell>{measurement.TDS}</TableCell>
              {/* <TableCell>{measurement.conductivity}</TableCell> */}
              <TableCell>{getStatusBadge(measurement.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export data
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Report issue
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

