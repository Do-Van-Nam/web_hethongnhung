"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle, WifiIcon, Battery, Cpu, Thermometer } from "lucide-react"

export function SystemStatus() {
  const systemComponents = [
    {
      name: "Main Controller",
      status: "operational",
      health: 98,
      icon: Cpu,
    },
    {
      name: "Sensor Array",
      status: "operational",
      health: 95,
      icon: Thermometer,
    },
    {
      name: "Network Connection",
      status: "operational",
      health: 92,
      icon: WifiIcon,
    },
    {
      name: "Battery Backup",
      status: "warning",
      health: 68,
      icon: Battery,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "operational":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Operational
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Warning
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getHealthColor = (health) => {
    if (health > 90) return "bg-green-500"
    if (health > 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      {systemComponents.map((component, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <component.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium truncate">{component.name}</p>
              {getStatusIcon(component.status)}
            </div>
            <div className="flex items-center justify-between">
              <Progress
                value={component.health}
                className="h-2 flex-1"
                indicatorClassName={getHealthColor(component.health)}
              />
              <span className="ml-2 text-xs text-muted-foreground">{component.health}%</span>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">System Status</span>
          {getStatusBadge("warning")}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Last maintenance: 45 days ago</p>
      </div>
    </div>
  )
}

