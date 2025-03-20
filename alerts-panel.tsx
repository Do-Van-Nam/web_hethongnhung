"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Clock, BellOff } from "lucide-react"

// Sample data - in a real application, this would come from your API
const alerts = [
  {
    id: "a1",
    timestamp: "2023-06-15 04:32:00",
    type: "warning",
    message: "Battery backup below 70% capacity",
    acknowledged: false,
    parameter: "System",
  },
  {
    id: "a2",
    timestamp: "2023-06-15 03:45:00",
    type: "warning",
    message: "Turbidity approaching upper threshold (2.2 NTU)",
    acknowledged: true,
    parameter: "Turbidity",
  },
  {
    id: "a3",
    timestamp: "2023-06-14 22:15:00",
    type: "critical",
    message: "pH level dropped below 6.8",
    acknowledged: true,
    parameter: "pH",
  },
  {
    id: "a4",
    timestamp: "2023-06-14 18:30:00",
    type: "info",
    message: "Scheduled maintenance reminder",
    acknowledged: true,
    parameter: "System",
  },
  {
    id: "a5",
    timestamp: "2023-06-14 14:20:00",
    type: "warning",
    message: "Temperature increased rapidly (1.5°C in 30 minutes)",
    acknowledged: true,
    parameter: "Temperature",
  },
  {
    id: "a6",
    timestamp: "2023-06-14 10:05:00",
    type: "critical",
    message: "Network connection interrupted for 5 minutes",
    acknowledged: true,
    parameter: "System",
  },
]

export function AlertsPanel() {
  const [activeAlerts, setActiveAlerts] = useState(alerts.filter((alert) => !alert.acknowledged))
  const [historicalAlerts, setHistoricalAlerts] = useState(alerts.filter((alert) => alert.acknowledged))

  const acknowledgeAlert = (id) => {
    setActiveAlerts((prev) => {
      const alert = prev.find((a) => a.id === id)
      const newActiveAlerts = prev.filter((a) => a.id !== id)

      if (alert) {
        setHistoricalAlerts((prev) => [{ ...alert, acknowledged: true }, ...prev])
      }

      return newActiveAlerts
    })
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getAlertBadge = (type) => {
    switch (type) {
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Critical
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Info
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const AlertItem = ({ alert, showAcknowledge = false }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{getAlertIcon(alert.type)}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{alert.parameter}</span>
                {getAlertBadge(alert.type)}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {alert.timestamp}
              </div>
            </div>
            <p className="text-sm">{alert.message}</p>
            {showAcknowledge && (
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                  Acknowledge
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-4">
        <TabsTrigger value="active">
          Active Alerts
          {activeAlerts.length > 0 && <Badge className="ml-2 bg-red-500 hover:bg-red-500">{activeAlerts.length}</Badge>}
        </TabsTrigger>
        <TabsTrigger value="history">Alert History</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        {activeAlerts.length > 0 ? (
          activeAlerts.map((alert) => <AlertItem key={alert.id} alert={alert} showAcknowledge />)
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <BellOff className="h-12 w-12 mb-3 opacity-20" />
            <h3 className="text-lg font-medium">No active alerts</h3>
            <p className="text-sm">All systems operating normally</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="history">
        {historicalAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </TabsContent>
    </Tabs>
  )
}

