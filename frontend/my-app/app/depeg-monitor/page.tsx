"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, Bell, AlertTriangle, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for the demo
const stablecoins = [
  { id: "usdc", name: "USDC", price: 0.998, change: -0.2, status: "stable", threshold: 2 },
  { id: "usdt", name: "USDT", price: 1.002, change: 0.1, status: "stable", threshold: 2 },
  { id: "dai", name: "DAI", price: 0.997, change: -0.3, status: "stable", threshold: 2 },
  { id: "frax", name: "FRAX", price: 0.991, change: -0.9, status: "warning", threshold: 1 },
  { id: "busd", name: "BUSD", price: 1.003, change: 0.3, status: "stable", threshold: 2 },
]

const lsts = [
  { id: "steth", name: "stETH", price: 0.993, change: -0.7, status: "warning", threshold: 2, ratio: "1:0.993" },
  { id: "reth", name: "rETH", price: 1.052, change: 0.2, status: "stable", threshold: 5, ratio: "1:1.052" },
  { id: "cbeth", name: "cbETH", price: 1.041, change: 0.1, status: "stable", threshold: 5, ratio: "1:1.041" },
  { id: "wbeth", name: "wBETH", price: 1.038, change: -0.2, status: "stable", threshold: 5, ratio: "1:1.038" },
]

const alerts = [
  {
    id: 1,
    asset: "FRAX",
    type: "warning",
    message: "FRAX price deviation approaching threshold",
    time: "10 minutes ago",
  },
  {
    id: 2,
    asset: "stETH",
    type: "warning",
    message: "stETH ratio decreased by 0.7% in the last hour",
    time: "35 minutes ago",
  },
  { id: 3, asset: "USDC", type: "info", message: "USDC price stabilized after minor fluctuation", time: "2 hours ago" },
]

export default function DepegMonitor() {
  const [activeTab, setActiveTab] = useState("stablecoins")
  const [monitoredAssets, setMonitoredAssets] = useState<string[]>(["usdc", "usdt", "dai", "steth", "reth"])

  const toggleAssetMonitoring = (assetId: string) => {
    if (monitoredAssets.includes(assetId)) {
      setMonitoredAssets(monitoredAssets.filter((id) => id !== assetId))
    } else {
      setMonitoredAssets([...monitoredAssets, assetId])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "alert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">PEGASUS Shield</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">PEGASUS Depeg Monitor</h1>
              <p className="text-gray-300">
                Real-time monitoring of stablecoins and pegged assets with AI-enhanced depeg prediction
              </p>
            </div>

            <Tabs defaultValue="stablecoins" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stablecoins">Stablecoins</TabsTrigger>
                <TabsTrigger value="lsts">Liquid Staking Tokens</TabsTrigger>
              </TabsList>
              <TabsContent value="stablecoins" className="mt-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Stablecoin Monitoring</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track price deviations from the $1.00 peg
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-gray-700">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-sm font-medium">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">Asset</div>
                        <div className="col-span-2">Current Price</div>
                        <div className="col-span-2">24h Change</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Threshold</div>
                        <div className="col-span-1">Alerts</div>
                      </div>
                      {stablecoins.map((coin) => (
                        <div
                          key={coin.id}
                          className="grid grid-cols-12 gap-4 p-4 border-t border-gray-700 items-center"
                        >
                          <div className="col-span-1">
                            <Switch
                              checked={monitoredAssets.includes(coin.id)}
                              onCheckedChange={() => toggleAssetMonitoring(coin.id)}
                            />
                          </div>
                          <div className="col-span-2 font-medium">{coin.name}</div>
                          <div className="col-span-2">${coin.price.toFixed(3)}</div>
                          <div className={`col-span-2 ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {coin.change >= 0 ? "+" : ""}
                            {coin.change}%
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <span className={`h-3 w-3 rounded-full ${getStatusColor(coin.status)}`}></span>
                            <span className="capitalize">{coin.status}</span>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <span>±{coin.threshold}%</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Alert when price deviates by ±{coin.threshold}% from $1.00</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Bell className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="lsts" className="mt-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Liquid Staking Token Monitoring</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track exchange rate deviations for Ethereum LSTs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-gray-700">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-sm font-medium">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">Asset</div>
                        <div className="col-span-2">Exchange Rate</div>
                        <div className="col-span-2">24h Change</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Threshold</div>
                        <div className="col-span-1">Alerts</div>
                      </div>
                      {lsts.map((lst) => (
                        <div key={lst.id} className="grid grid-cols-12 gap-4 p-4 border-t border-gray-700 items-center">
                          <div className="col-span-1">
                            <Switch
                              checked={monitoredAssets.includes(lst.id)}
                              onCheckedChange={() => toggleAssetMonitoring(lst.id)}
                            />
                          </div>
                          <div className="col-span-2 font-medium">{lst.name}</div>
                          <div className="col-span-2">{lst.ratio}</div>
                          <div className={`col-span-2 ${lst.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {lst.change >= 0 ? "+" : ""}
                            {lst.change}%
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <span className={`h-3 w-3 rounded-full ${getStatusColor(lst.status)}`}></span>
                            <span className="capitalize">{lst.status}</span>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <span>±{lst.threshold}%</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Alert when exchange rate changes by ±{lst.threshold}% in 24h</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Bell className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle>Configure {activeTab === "stablecoins" ? "Stablecoin" : "LST"} Monitoring</CardTitle>
                <CardDescription className="text-gray-400">
                  Add new assets to monitor or adjust threshold settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="new-asset">Add New Asset</Label>
                    <div className="flex gap-2 mt-2">
                      <Select>
                        <SelectTrigger id="new-asset" className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lusd">LUSD</SelectItem>
                          <SelectItem value="gusd">GUSD</SelectItem>
                          <SelectItem value="susd">sUSD</SelectItem>
                          <SelectItem value="sfrxeth">sfrxETH</SelectItem>
                          <SelectItem value="sweth">swETH</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>Add</Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="default-threshold">Default Alert Threshold</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Slider defaultValue={[2]} max={10} step={0.5} className="flex-1" />
                      <span className="min-w-[40px] text-center">2%</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="data-source">Price Data Source</Label>
                    <Select defaultValue="chainlink">
                      <SelectTrigger id="data-source" className="mt-2 bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chainlink">Chainlink Oracles</SelectItem>
                        <SelectItem value="uniswap">Uniswap TWAP</SelectItem>
                        <SelectItem value="pyth">Pyth Network</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="alert-method">Alert Method</Label>
                    <Select defaultValue="sentinel">
                      <SelectTrigger id="alert-method" className="mt-2 bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select alert method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sentinel">Sentinel SDK</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/4">
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Alerts</span>
                  <Badge variant="outline" className="bg-gray-700">
                    {alerts.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-md bg-gray-700 border-l-4 border-yellow-500">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium mb-1">
                            {alert.asset}: {alert.message}
                          </div>
                          <div className="text-sm text-gray-400">{alert.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>AI Depeg Prediction</CardTitle>
                <CardDescription className="text-gray-400">
                  Predictive analytics for potential depegging events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-gray-700">
                    <div className="font-medium mb-2">FRAX</div>
                    <div className="text-sm text-gray-300 mb-3">
                      AI model predicts 68% chance of further deviation in the next 24 hours based on on-chain activity
                      patterns.
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div className="p-3 rounded-md bg-gray-700">
                    <div className="font-medium mb-2">stETH</div>
                    <div className="text-sm text-gray-300 mb-3">
                      AI model predicts 42% chance of stabilization in the next 24 hours based on historical patterns.
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold">PEGASUS Shield</span>
            </div>
            <div className="text-gray-400 text-sm">© 2025 PEGASUS Shield. Built for ETHDenver Hackathon.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

