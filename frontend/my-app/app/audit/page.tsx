"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, Github, Code, AlertTriangle, Download, Wand2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "../providers"
import { useRouter } from "next/navigation"

const vulnerableCode = `function withdraw(uint amount) external {
  require(balances[msg.sender] >= amount);
  (bool success, ) = msg.sender.call{value: amount}("");
  require(success, "Transfer failed");
  balances[msg.sender] -= amount;
}`

export default function Audit() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const { toast } = useToast()
  const [inputMethod, setInputMethod] = useState("code")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [contractCode, setContractCode] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [contractName, setContractName] = useState("")
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

  const handleAnalyze = () => {
    if (!contractCode && !repoUrl) {
      toast({
        title: "Input Required",
        description: "Please provide either contract code or a repository URL.",
        variant: "destructive",
      })
      return
    }

    if (inputMethod === "code" && !contractName) {
      toast({
        title: "Contract Name Required",
        description: "Please provide a name for your contract.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setProgress(0)

    toast({
      title: "Analysis Started",
      description: "Your contract is being analyzed. This may take a few moments.",
    })

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          toast({
            title: "Analysis Complete",
            description: "Your contract analysis is ready to view.",
          })
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  const handleClear = () => {
    setContractCode("")
    setRepoUrl("")
    setContractName("")
    setAnalysisComplete(false)
    setProgress(0)
    toast({
      title: "Form Cleared",
      description: "All input fields have been cleared.",
    })
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The analysis report has been downloaded to your device.",
    })
  }

  const handleFixVulnerabilities = () => {
    toast({
      title: "Auto-fix Started",
      description: "Attempting to fix detected vulnerabilities...",
    })
    // Add your fix logic here
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Rest of the component remains the same but with escaped code blocks */}
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
          <h1 className="text-3xl font-bold mb-2">AI Smart Contract Auditor</h1>
          <p className="text-gray-300">Detect vulnerabilities in Solidity smart contracts</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Submit Smart Contract for Analysis</CardTitle>
            <CardDescription className="text-gray-400">
              Paste your Solidity code or provide a GitHub repository URL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" className="mb-6" onValueChange={setInputMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="h-4 w-4" /> Paste Code
                </TabsTrigger>
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" /> GitHub Repository
                </TabsTrigger>
              </TabsList>
              <TabsContent value="code" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contract-name">Contract Name</Label>
                    <Input
                      id="contract-name"
                      placeholder="MyToken"
                      className="mt-1 bg-gray-700 border-gray-600"
                      value={contractName}
                      onChange={(e) => setContractName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract-code">Solidity Code</Label>
                    <Textarea
                      id="contract-code"
                      placeholder="// SPDX-License-Identifier: MIT..."
                      className="mt-1 min-h-[300px] font-mono text-sm bg-gray-700 border-gray-600"
                      value={contractCode}
                      onChange={(e) => setContractCode(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="github" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="repo-url">GitHub Repository URL</Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repo"
                      className="mt-1 bg-gray-700 border-gray-600"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      placeholder="main"
                      defaultValue="main"
                      className="mt-1 bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" className="border-gray-600" onClick={handleClear}>
                Clear
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleAnalyze}
                disabled={
                  isAnalyzing || (inputMethod === "code" && !contractCode) || (inputMethod === "github" && !repoUrl)
                }
              >
                {isAnalyzing ? (
                  <>
                    Analyzing<span className="loading ml-2">...</span>
                  </>
                ) : (
                  <>Analyze Contract</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isAnalyzing || analysisComplete) && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              {isAnalyzing ? (
                <CardDescription className="text-gray-400">Analyzing your smart contract...</CardDescription>
              ) : (
                <CardDescription className="text-gray-400">We found 2 vulnerabilities in your contract</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="space-y-4">
                  <Progress value={progress} className="h-2 w-full" />
                  <div className="grid grid-cols-4 gap-4 text-center text-sm">
                    <div
                      className={`p-2 rounded ${progress >= 25 ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700"}`}
                    >
                      Static Analysis
                    </div>
                    <div
                      className={`p-2 rounded ${progress >= 50 ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700"}`}
                    >
                      Vulnerability Scan
                    </div>
                    <div
                      className={`p-2 rounded ${progress >= 75 ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700"}`}
                    >
                      AI Analysis
                    </div>
                    <div
                      className={`p-2 rounded ${progress >= 100 ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700"}`}
                    >
                      Report Generation
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500">
                        High
                      </Badge>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
                        Medium
                      </Badge>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500">
                        Passed
                      </Badge>
                      <span className="font-medium">8</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-md border border-red-500/50 bg-red-500/10">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-red-400 mb-1">Reentrancy Vulnerability</div>
                          <div className="text-sm text-gray-300 mb-2">
                            The withdraw function is vulnerable to reentrancy attacks because it updates the balance
                            after transferring ETH.
                          </div>
                          <div className="bg-gray-900 p-3 rounded text-sm font-mono mb-2">
                            <div className="text-red-400">// Vulnerable code</div>
                            {vulnerableCode.split("\n").map((line, i) => (
                              <div key={i} className="pl-4">
                                {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-md border border-yellow-500/50 bg-yellow-500/10">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-yellow-400 mb-1">Integer Overflow</div>
                          <div className="text-sm text-gray-300 mb-2">
                            Potential integer overflow in the addReward function when calculating rewards.
                          </div>
                          <div className="bg-gray-900 p-3 rounded text-sm font-mono mb-2">
                            <div className="text-yellow-400">// Vulnerable code</div>
                            <div>{"uint256 newReward = userBalance * rewardRate * timePassed;"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {analysisComplete && (
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" className="border-gray-600" onClick={handleDownloadReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleFixVulnerabilities}>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Fix Vulnerabilities
                </Button>
              </CardFooter>
            )}
          </Card>
        )}
      </main>

      <footer className="bg-gray-800 py-6 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <div className="text-gray-400 text-sm">© 2025 PEGASUS Shield. Built for ETHDenver Hackathon.</div>
        </div>
      </footer>
    </div>
  )
}

