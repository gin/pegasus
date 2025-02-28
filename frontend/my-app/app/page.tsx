"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Code, LineChart } from "lucide-react"
import { useWallet } from "./providers"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const { isConnected, connect, disconnect } = useWallet()
  const { toast } = useToast()

  const handleConnect = () => {
    connect()
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your wallet.",
    })
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">PEGASUS Shield</span>
          </div>
          <Button
            variant="outline"
            className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
            onClick={isConnected ? handleDisconnect : handleConnect}
          >
            {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-12">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">DeFi Security Platform</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Depeg monitoring and smart contract auditing in one simple tool
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-6 w-6 text-emerald-500" />
                  Depeg Monitor
                </CardTitle>
                <CardDescription className="text-gray-400">Monitor stablecoins and pegged assets</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    Real-time price tracking via Chainlink
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    Customizable alert thresholds
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    Instant alerts via Sentinel SDK
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/monitor" className="w-full">
                    Monitor Assets
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-emerald-500" />
                  Smart Contract Auditor
                </CardTitle>
                <CardDescription className="text-gray-400">AI-powered vulnerability detection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    Static analysis + AI reasoning
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    GitHub repository integration
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    Vulnerability reports with fixes
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/audit" className="w-full">
                    Audit Contracts
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <div className="text-gray-400 text-sm">© 2025 PEGASUS Shield. Built for ETHDenver Hackathon.</div>
        </div>
      </footer>
    </div>
  )
}

