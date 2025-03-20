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

// Sample data - in a real application, this would come from your API
const measurements = [
  {
    id: "m1",
    timestamp: "2023-06-15 08:00:00",
    pH: 7.2,
    temperature: 24.5,
    turbidity: 1.2,
    oxygen: 8.5,
    conductivity: 420,
    status: "normal",
  },
  {
    id: "m2",
    timestamp: "2023-06-15 07:00:00",
    pH: 7.3,
    temperature: 24.2,
    turbidity: 1.3,
    oxygen: 8.4,
    conductivity: 425,
    status: "normal",
  },
  {
    id: "m3",
    timestamp: "2023-06-15 06:00:00",
    pH: 7.1,
    temperature: 23.9,
    turbidity: 1.5,
    oxygen: 8.2,
    conductivity: 430,
    status: "normal",
  },
  {
    id: "m4",
    timestamp: "2023-06-15 05:00:00",
    pH: 7.0,
    temperature: 23.7,
    turbidity: 1.8,
    oxygen: 8.0,
    conductivity: 435,
    status: "normal",
  },
  {
    id: "m5",
    timestamp: "2023-06-15 04:00:00",
    pH: 6.9,
    temperature: 23.5,
    turbidity: 2.2,
    oxygen: 7.8,
    conductivity: 440,
    status: "warning",
  },
  {
    id: "m6",
    timestamp: "2023-06-15 03:00:00",
    pH: 6.8,
    temperature: 23.3,
    turbidity: 2.5,
    oxygen: 7.6,
    conductivity: 445,
    status: "warning",
  },
  {
    id: "m7",
    timestamp: "2023-06-15 02:00:00",
    pH: 7.4,
    temperature: 24.8,
    turbidity: 1.1,
    oxygen: 8.6,
    conductivity: 415,
    status: "normal",
  },
]

export function WaterQualityTable() {
  const [data] = useState(measurements)

  const getStatusBadge = (status) => {
    switch (status) {
      case "normal":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Normal
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Warning
          </Badge>
        )
      case "alert":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Alert
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
            <TableHead>pH</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Turbidity (NTU)</TableHead>
            <TableHead>Dissolved Oxygen (mg/L)</TableHead>
            <TableHead>Conductivity (μS/cm)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((measurement) => (
            <TableRow key={measurement.id}>
              <TableCell className="font-medium">{measurement.timestamp}</TableCell>
              <TableCell>{measurement.pH}</TableCell>
              <TableCell>{measurement.temperature}</TableCell>
              <TableCell>{measurement.turbidity}</TableCell>
              <TableCell>{measurement.oxygen}</TableCell>
              <TableCell>{measurement.conductivity}</TableCell>
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

