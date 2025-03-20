"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, RefreshCw, Bell, Shield, Droplets } from "lucide-react"

export function SettingsPanel() {
  const [thresholds, setThresholds] = useState({
    phMin: 6.5,
    phMax: 8.5,
    tempMin: 20,
    tempMax: 26,
    turbidityMax: 5,
    oxygenMin: 6.5,
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    critical: true,
    warning: true,
    info: false,
  })

  const [system, setSystem] = useState({
    sampleRate: "15",
    maintenanceInterval: "90",
    autoCalibration: true,
    dataRetention: "180",
    networkMode: "ethernet",
  })

  const handleThresholdChange = (key, value) => {
    setThresholds((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Tabs defaultValue="thresholds">
      <TabsList className="mb-4">
        <TabsTrigger value="thresholds">
          <Droplets className="h-4 w-4 mr-2" />
          Thresholds
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="system">
          <Shield className="h-4 w-4 mr-2" />
          System
        </TabsTrigger>
      </TabsList>

      <TabsContent value="thresholds">
        <Card>
          <CardHeader>
            <CardTitle>Alert Thresholds</CardTitle>
            <CardDescription>
              Configure when the system should trigger alerts based on water quality parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>pH Range</Label>
                  <span className="text-sm text-muted-foreground">
                    {thresholds.phMin} - {thresholds.phMax}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ph-min" className="text-xs">
                      Minimum
                    </Label>
                    <Slider
                      id="ph-min"
                      min={0}
                      max={14}
                      step={0.1}
                      value={[thresholds.phMin]}
                      onValueChange={([value]) => handleThresholdChange("phMin", value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ph-max" className="text-xs">
                      Maximum
                    </Label>
                    <Slider
                      id="ph-max"
                      min={0}
                      max={14}
                      step={0.1}
                      value={[thresholds.phMax]}
                      onValueChange={([value]) => handleThresholdChange("phMax", value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Temperature Range (°C)</Label>
                  <span className="text-sm text-muted-foreground">
                    {thresholds.tempMin} - {thresholds.tempMax}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temp-min" className="text-xs">
                      Minimum
                    </Label>
                    <Slider
                      id="temp-min"
                      min={0}
                      max={40}
                      step={0.5}
                      value={[thresholds.tempMin]}
                      onValueChange={([value]) => handleThresholdChange("tempMin", value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temp-max" className="text-xs">
                      Maximum
                    </Label>
                    <Slider
                      id="temp-max"
                      min={0}
                      max={40}
                      step={0.5}
                      value={[thresholds.tempMax]}
                      onValueChange={([value]) => handleThresholdChange("tempMax", value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Turbidity Maximum (NTU)</Label>
                  <span className="text-sm text-muted-foreground">{thresholds.turbidityMax}</span>
                </div>
                <Slider
                  min={0}
                  max={20}
                  step={0.5}
                  value={[thresholds.turbidityMax]}
                  onValueChange={([value]) => handleThresholdChange("turbidityMax", value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Dissolved Oxygen Minimum (mg/L)</Label>
                  <span className="text-sm text-muted-foreground">{thresholds.oxygenMin}</span>
                </div>
                <Slider
                  min={0}
                  max={12}
                  step={0.1}
                  value={[thresholds.oxygenMin]}
                  onValueChange={([value]) => handleThresholdChange("oxygenMin", value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how and when you receive alerts from the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Methods</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex items-center gap-2">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                    SMS Notifications
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="flex items-center gap-2">
                    Push Notifications
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Alert Levels</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="critical-alerts" className="flex items-center gap-2">
                      Critical Alerts
                    </Label>
                    <Switch
                      id="critical-alerts"
                      checked={notifications.critical}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, critical: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="warning-alerts" className="flex items-center gap-2">
                      Warning Alerts
                    </Label>
                    <Switch
                      id="warning-alerts"
                      checked={notifications.warning}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, warning: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="info-alerts" className="flex items-center gap-2">
                      Informational Alerts
                    </Label>
                    <Switch
                      id="info-alerts"
                      checked={notifications.info}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, info: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Contact Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="admin@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Configure system behavior and maintenance settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sample-rate">Sample Rate (minutes)</Label>
                <Select
                  value={system.sampleRate}
                  onValueChange={(value) => setSystem((prev) => ({ ...prev, sampleRate: value }))}
                >
                  <SelectTrigger id="sample-rate">
                    <SelectValue placeholder="Select sample rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maintenance-interval">Maintenance Interval (days)</Label>
                <Select
                  value={system.maintenanceInterval}
                  onValueChange={(value) => setSystem((prev) => ({ ...prev, maintenanceInterval: value }))}
                >
                  <SelectTrigger id="maintenance-interval">
                    <SelectValue placeholder="Select maintenance interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">365 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                <Select
                  value={system.dataRetention}
                  onValueChange={(value) => setSystem((prev) => ({ ...prev, dataRetention: value }))}
                >
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Select data retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">365 days</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="network-mode">Network Connection Mode</Label>
                <Select
                  value={system.networkMode}
                  onValueChange={(value) => setSystem((prev) => ({ ...prev, networkMode: value }))}
                >
                  <SelectTrigger id="network-mode">
                    <SelectValue placeholder="Select network mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethernet">Ethernet</SelectItem>
                    <SelectItem value="wifi">Wi-Fi</SelectItem>
                    <SelectItem value="cellular">Cellular (4G/LTE)</SelectItem>
                    <SelectItem value="lora">LoRa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="auto-calibration" className="flex items-center gap-2">
                  Automatic Sensor Calibration
                </Label>
                <Switch
                  id="auto-calibration"
                  checked={system.autoCalibration}
                  onCheckedChange={(checked) => setSystem((prev) => ({ ...prev, autoCalibration: checked }))}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-medium">System Information</h3>
                  <p className="text-xs text-muted-foreground mt-1">Firmware Version: v2.4.1</p>
                  <p className="text-xs text-muted-foreground">Last Calibration: 2023-05-30</p>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Check for Updates
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

