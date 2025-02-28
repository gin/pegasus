"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, AlertTriangle, LineChart, Code, Bell, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for the dashboard
const depegAlerts = [
  {
    id: 1,
    asset: "FRAX",
    type: "warning",
    message: "FRAX price deviation approaching threshold",
    time: "10 minutes ago",
    value: "0.991",
  },
  {
    id: 2,
    asset: "stETH",
    type: "warning",
    message: "stETH ratio decreased by 0.7% in the last hour",
    time: "35 minutes ago",
    value: "0.993",
  },
]

const securityAlerts = [
  { id: 1, contract: "TokenVault", severity: "high", issue: "Reentrancy vulnerability detected", time: "2 hours ago" },
  {
    id: 2,
    contract: "StakingPool",
    severity: "medium",
    issue: "Integer overflow in reward calculation",
    time: "1 day ago",
  },
  {
    id: 3,
    contract: "LiquidityProvider",
    severity: "low",
    issue: "Missing event emission for state changes",
    time: "2 days ago",
  },
]

const monitoredAssets = [
  { id: "usdc", name: "USDC", price: 0.998, change: -0.2, status: "stable" },
  { id: "usdt", name: "USDT", price: 1.002, change: 0.1, status: "stable" },
  { id: "dai", name: "DAI", price: 0.997, change: -0.3, status: "stable" },
  { id: "frax", name: "FRAX", price: 0.991, change: -0.9, status: "warning" },
  { id: "steth", name: "stETH", price: 0.993, change: -0.7, status: "warning", ratio: "1:0.993" },
  { id: "reth", name: "rETH", price: 1.052, change: 0.2, status: "stable", ratio: "1:1.052" },
]

const auditedContracts = [
  { id: 1, name: "TokenVault", date: "Feb 25, 2025", issues: 3, status: "Issues Found" },
  { id: 2, name: "StakingPool", date: "Feb 23, 2025", issues: 2, status: "Issues Found" },
  { id: 3, name: "LiquidityProvider", date: "Feb 20, 2025", issues: 1, status: "Issues Found" },
  { id: 4, name: "RewardDistributor", date: "Feb 18, 2025", issues: 0, status: "Secure" },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500"
    }
  }

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case "Secure":
        return "bg-green-500/20 text-green-400 border-green-500"
      case "Issues Found":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500"
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
          <p className="text-gray-300">Comprehensive overview of your DeFi security status</p>
        </div>

        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="depeg-alerts">Depeg Alerts</TabsTrigger>
            <TabsTrigger value="security-alerts">Security Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Monitored Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{monitoredAssets.length}</div>
                  <p className="text-sm text-gray-400 mt-1">2 with warnings</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Audited Contracts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{auditedContracts.length}</div>
                  <p className="text-sm text-gray-400 mt-1">3 with issues</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{depegAlerts.length + securityAlerts.length}</div>
                  <p className="text-sm text-gray-400 mt-1">1 high severity</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Security Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">78/100</div>
                  <p className="text-sm text-gray-400 mt-1">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-emerald-500" />
                      <span>Asset Status</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 border-gray-600">
                      <Link href="/depeg-monitor" className="flex items-center gap-1">
                        View All <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-gray-700">
                    <div className="grid grid-cols-12 gap-4 p-3 bg-gray-700 text-sm font-medium">
                      <div className="col-span-3">Asset</div>
                      <div className="col-span-3">Price</div>
                      <div className="col-span-3">Change</div>
                      <div className="col-span-3">Status</div>
                    </div>
                    {monitoredAssets.slice(0, 5).map((asset) => (
                      <div key={asset.id} className="grid grid-cols-12 gap-4 p-3 border-t border-gray-700 items-center">
                        <div className="col-span-3 font-medium">{asset.name}</div>
                        <div className="col-span-3">${asset.price.toFixed(3)}</div>
                        <div className={`col-span-3 ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {asset.change >= 0 ? "+" : ""}
                          {asset.change}%
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(asset.status)}`}></span>
                          <span className="capitalize">{asset.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-emerald-500" />
                      <span>Recent Audits</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 border-gray-600">
                      <Link href="/contract-auditor" className="flex items-center gap-1">
                        View All <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-gray-700">
                    <div className="grid grid-cols-12 gap-4 p-3 bg-gray-700 text-sm font-medium">
                      <div className="col-span-4">Contract</div>
                      <div className="col-span-3">Date</div>
                      <div className="col-span-2">Issues</div>
                      <div className="col-span-3">Status</div>
                    </div>
                    {auditedContracts.slice(0, 5).map((contract) => (
                      <div
                        key={contract.id}
                        className="grid grid-cols-12 gap-4 p-3 border-t border-gray-700 items-center"
                      >
                        <div className="col-span-4 font-medium">{contract.name}</div>
                        <div className="col-span-3 text-gray-400">{contract.date}</div>
                        <div className="col-span-2">{contract.issues}</div>
                        <div className="col-span-3">
                          <Badge variant="outline" className={getContractStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="depeg-alerts" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Depeg Alerts</CardTitle>
                <CardDescription className="text-gray-400">
                  Alerts for stablecoins and pegged assets with price deviations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {depegAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {depegAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 rounded-md bg-yellow-500/10 border border-yellow-500/50">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-yellow-400">{alert.asset}</span>
                              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
                                Warning
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-300 mt-1">{alert.message}</div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-sm text-gray-400">{alert.time}</div>
                              <div className="text-sm font-medium">Current value: {alert.value}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Depeg Alerts</h3>
                    <p className="text-gray-400">All monitored assets are within their threshold limits</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security-alerts" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription className="text-gray-400">
                  Alerts for smart contract vulnerabilities and security issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                {securityAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {securityAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-md border ${
                          alert.severity === "high"
                            ? "bg-red-500/10 border-red-500/50"
                            : alert.severity === "medium"
                              ? "bg-yellow-500/10 border-yellow-500/50"
                              : "bg-blue-500/10 border-blue-500/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              alert.severity === "high"
                                ? "text-red-500"
                                : alert.severity === "medium"
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                            } shrink-0 mt-0.5`}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{alert.contract}</span>
                              <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-300 mt-1">{alert.issue}</div>
                            <div className="text-sm text-gray-400 mt-2">{alert.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Security Alerts</h3>
                    <p className="text-gray-400">All audited contracts are secure</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

