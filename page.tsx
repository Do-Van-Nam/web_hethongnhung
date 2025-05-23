import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, Settings, ThermometerIcon, Clock, Activity, Eye, Filter } from "lucide-react"
import { WaterQualityChart } from "./water-quality-chart"
import { WaterQualityTable } from "./water-quality-table"
import { SystemStatus } from "./system-status"
import { AlertsPanel } from "./alerts-panel"
import { SettingsPanel } from "./settings-panel"
import { WaterQualityMap } from "./water-quality-map"
import SensorDataComponent from "@/components/sensor-data-component";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://api-iot-kappa.vercel.app"; // Thay bằng URL thực tế nếu deploy

export default function WaterQualityDashboard() {
  const [sensorData, setSensorData] = useState(null);
  
  useEffect(() => {
    // Function to fetch sensor data from API
    const fetchSensorData = async () => {
      try {
        const response = await fetch('https://api-iot-kappa.vercel.app/api/latest');
        const data = await response.json();
        console.log("Data fetched from API:", data);
        
        // Only update state if the new data is different from current data
        if (!sensorData || 
            JSON.stringify(data) !== JSON.stringify(sensorData)) {
          console.log("Updating sensor data with new values");
          setSensorData(data);
        } else {
          console.log("No changes in sensor data");
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    // Fetch data immediately when component mounts
    fetchSensorData();
    
    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchSensorData, 5000);
    
    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, [sensorData]);
  
    // useEffect(() => {
    //   const socket = io(SOCKET_SERVER_URL);
  
    //   // Lắng nghe sự kiện 'sensorData' từ backend
    //   socket.on("sensorData", (data) => {
    //     console.log("Dữ liệu nhận từ WebSocket:", data);
    //     setSensorData(data);
    //   });
  
    //   // return () => {
    //   //   socket.disconnect(); // Ngắt kết nối khi component unmount
    //   // };
    // }, []);




  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
       {/* <WaterQualityMap /> */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-cyan-600" />
          <h1 className="text-lg font-semibold">AquaMonitor Pro</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="hidden md:inline-flex">
            System: Online
          </Badge>
          {/* <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button> */}
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

        {/* Thêm phần hiển thị trạng thái chất lượng nước */}
        {/* <div className="flex items-center gap-2">
    <h2 className="text-lg font-semibold">Water quality:</h2>
    <Badge variant="outline" className="text-green-600 border-green-600">
      Normal
    </Badge>
  </div> */}
   {/* <SensorDataComponent /> */}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Trạng thái chất lượng nước */}
          <Card className={`border ${sensorData?.status === "bad" ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${sensorData?.status === "bad" ? "text-red-700" : "text-green-700"}`}>
                Water Quality Status
              </CardTitle>
              <Droplets className={`h-6 w-6 ${sensorData?.status === "bad" ? "text-red-700" : "text-green-700"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${sensorData?.status === "bad" ? "text-red-700" : "text-green-700"}`}>{sensorData?.status?.toUpperCase() ?? "..."}</div>
              <p className={`text-xs ${sensorData?.status === "bad" ? "text-red-600" : "text-green-600"}`}>
                {sensorData?.status === "bad" 
                  ? "Some parameters are outside the optimal range" 
                  : "All parameters are within the optimal range"}
              </p>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">pH Level</CardTitle>
              <Droplets className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.2</div>
              <p className="text-xs text-muted-foreground">Optimal range: 6.5-8.5</p>
              <Progress value={72} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <ThermometerIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5°C</div>
              <p className="text-xs text-muted-foreground">Optimal range: 20-26°C</p>
              <Progress value={65} className="mt-2" />
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
              <Eye className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensorData?.NTU ?? "..."} NTU </div>
              <p className="text-xs text-muted-foreground">Optimal range: 0-5 NTU</p>
              <Progress value={24} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dissolved Solids</CardTitle>
              <Activity className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensorData?.TDS ?? "..."} ppm</div>
              <p className="text-xs text-muted-foreground">Optimal range: 0-300 ppm</p>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview">
        
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              {/* <TabsTrigger value="history">History</TabsTrigger> */}
              {/* <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger> */}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {/* <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filter</span>
              </Button> */}
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Last updated: 5 seconds ago</span>
              </Button>
            </div>
          </div>

          

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-7">
                <CardHeader>
                  <CardTitle>Water Quality Metrics</CardTitle>
                  <CardDescription>Real-time monitoring of key water quality parameters</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <WaterQualityChart />
                </CardContent>
              </Card>
              {/* <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <SystemStatus />
                </CardContent>
              </Card> */}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Measurements</CardTitle>
                <CardDescription>Detailed water quality data from the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterQualityTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <WaterQualityMap sensorData={sensorData}/>
          </TabsContent>

          {/* <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historical Data</CardTitle>
                <CardDescription>Water quality trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <WaterQualityChart historical />
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
          {/* <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsPanel />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system parameters and alert thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsPanel />
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </main>
    </div>
  )
}

