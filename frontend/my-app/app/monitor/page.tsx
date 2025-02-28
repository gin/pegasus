"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, AlertTriangle, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "../providers"
import { useRouter } from "next/navigation"

// Simple mock data
const stablecoins = [
  { id: "usdc", name: "USDC", price: 0.998, change: -0.2, status: "stable", threshold: 2 },
  { id: "usdt", name: "USDT", price: 1.002, change: 0.1, status: "stable", threshold: 2 },
  { id: "dai", name: "DAI", price: 0.997, change: -0.3, status: "stable", threshold: 2 },
  { id: "frax", name: "FRAX", price: 0.991, change: -0.9, status: "warning", threshold: 1 },
]

const lsts = [
  { id: "steth", name: "stETH", price: 0.993, change: -0.7, status: "warning", threshold: 2, ratio: "1:0.993" },
  { id: "reth", name: "rETH", price: 1.052, change: 0.2, status: "stable", threshold: 5, ratio: "1:1.052" },
]

export default function Monitor() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const { toast } = useToast()
  const [monitoredAssets, setMonitoredAssets] = useState<string[]>(["usdc", "usdt", "dai", "steth", "reth"])
  const [alerts, setAlerts] = useState([
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
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check wallet connection
  useEffect(() => {
    if (!isConnected && !isLoading) {
      toast({
        title: "Connection Required",
        description: "Please connect your wallet to access this page.",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [isConnected, isLoading, router, toast])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-800">
            <div className="h-full w-full animate-pulse bg-emerald-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return null
  }

  const toggleAssetMonitoring = (assetId: string) => {
    if (monitoredAssets.includes(assetId)) {
      setMonitoredAssets(monitoredAssets.filter((id) => id !== assetId))
      toast({
        title: "Asset Removed",
        description: `Stopped monitoring ${assetId.toUpperCase()}`,
      })
    } else {
      setMonitoredAssets([...monitoredAssets, assetId])
      toast({
        title: "Asset Added",
        description: `Now monitoring ${assetId.toUpperCase()}`,
      })
    }
  }

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
    toast({
      title: "Alert Dismissed",
      description: "The alert has been removed from your list.",
    })
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
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Rest of the component remains the same */}
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">PEGASUS Shield</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Depeg Monitor</h1>
          <p className="text-gray-300">Monitor stablecoins and pegged assets for price deviations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle>Stablecoin Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-sm font-medium">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Asset</div>
                    <div className="col-span-3">Current Price</div>
                    <div className="col-span-3">24h Change</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  {stablecoins.map((coin) => (
                    <div key={coin.id} className="grid grid-cols-12 gap-4 p-4 border-t border-gray-700 items-center">
                      <div className="col-span-1">
                        <Switch
                          checked={monitoredAssets.includes(coin.id)}
                          onCheckedChange={() => toggleAssetMonitoring(coin.id)}
                        />
                      </div>
                      <div className="col-span-3 font-medium">{coin.name}</div>
                      <div className="col-span-3">${coin.price.toFixed(3)}</div>
                      <div className={`col-span-3 ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {coin.change >= 0 ? "+" : ""}
                        {coin.change}%
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${getStatusColor(coin.status)}`}></span>
                        <span className="capitalize">{coin.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Liquid Staking Token Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-sm font-medium">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Asset</div>
                    <div className="col-span-3">Exchange Rate</div>
                    <div className="col-span-3">24h Change</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  {lsts.map((lst) => (
                    <div key={lst.id} className="grid grid-cols-12 gap-4 p-4 border-t border-gray-700 items-center">
                      <div className="col-span-1">
                        <Switch
                          checked={monitoredAssets.includes(lst.id)}
                          onCheckedChange={() => toggleAssetMonitoring(lst.id)}
                        />
                      </div>
                      <div className="col-span-3 font-medium">{lst.name}</div>
                      <div className="col-span-3">{lst.ratio}</div>
                      <div className={`col-span-3 ${lst.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {lst.change >= 0 ? "+" : ""}
                        {lst.change}%
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${getStatusColor(lst.status)}`}></span>
                        <span className="capitalize">{lst.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-800 border-gray-700">
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
                        <div className="flex-1">
                          <div className="font-medium mb-1">
                            {alert.asset}: {alert.message}
                          </div>
                          <div className="text-sm text-gray-400">{alert.time}</div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => dismissAlert(alert.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 py-6 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <div className="text-gray-400 text-sm">© 2025 PEGASUS Shield. Built for ETHDenver Hackathon.</div>
        </div>
      </footer>
    </div>
  )
}

