"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, Github, Code, AlertTriangle, CheckCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContractAuditor() {
  const [inputMethod, setInputMethod] = useState("code")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [contractCode, setContractCode] = useState("")
  const [repoUrl, setRepoUrl] = useState("")

  const handleAnalyze = () => {
    if (!contractCode && !repoUrl) return

    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setProgress(0)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 300)
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
          <h1 className="text-3xl font-bold mb-2">AI Smart Contract Auditor</h1>
          <p className="text-gray-300">
            Detect vulnerabilities in Solidity smart contracts using AI-powered analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                        />
                      </div>
                      <div>
                        <Label htmlFor="contract-code">Solidity Code</Label>
                        <Textarea 
                          id="contract-code" 
                          placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    // Paste your contract code here
}"
                          className="mt-1 min-h-[300px] font-mono text-sm bg-gray-700 border-gray-600"
                          value={contractCode}
                          onChange={(e) => setContractCode(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="solidity-version">Solidity Version</Label>
                        <Select defaultValue="0.8.20">
                          <SelectTrigger id="solidity-version" className="mt-1 bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select version" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.8.20">0.8.20</SelectItem>
                            <SelectItem value="0.8.19">0.8.19</SelectItem>
                            <SelectItem value="0.8.17">0.8.17</SelectItem>
                            <SelectItem value="0.8.0">0.8.0</SelectItem>
                            <SelectItem value="0.7.6">0.7.6</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <div>
                        <Label htmlFor="contract-path">Contract Path (optional)</Label>
                        <Input 
                          id="contract-path" 
                          placeholder="contracts/MyToken.sol" 
                          className="mt-1 bg-gray-700 border-gray-600" 
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button variant="outline" className="border-gray-600">
                    Clear
                  </Button>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || (inputMethod === "code" && !contractCode) || (inputMethod === "github" && !repoUrl)}
                  >
                    {isAnalyzing ? (
                      <>Analyzing<span className="loading ml-2">...</span></>
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
                    <CardDescription className="text-gray-400">
                      Analyzing your smart contract...
                    </CardDescription>
                  ) : (
                    <CardDescription className="text-gray-400">
                      We found 3 vulnerabilities in your contract
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <Progress value={progress} className="h-2 w-full" />
                      <div className="grid grid-cols-4 gap-4 text-center text-sm">
                        <div className={`p-2 rounded ${progress >= 25 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700'}`}>
                          Static Analysis
                        </div>
                        <div className={`p-2 rounded ${progress >= 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700'}`}>
                          Vulnerability Scan
                        </div>
                        <div className={`p-2 rounded ${progress >= 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700'}`}>
                          AI Analysis
                        </div>
                        <div className={`p-2 rounded ${progress >= 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700'}`}>
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
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500">
                            Low
                          </Badge>
                          <span className="font-medium">1</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500">
                            Passed
                          </Badge>
                          <span className="font-medium">12</span>
                        </div>
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="space-y-4">
                        <div className="p-4 rounded-md border border-red-500/50 bg-red-500/10">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium text-red-400 mb-1">Reentrancy Vulnerability</div>
                              <div className="text-sm text-gray-300 mb-2">
                                The withdraw function is vulnerable to reentrancy attacks because it updates the balance after transferring ETH.
                              </div>
                              <div className="bg-gray-900 p-3 rounded text-sm font-mono mb-2">
                                <div className="text-red-400">// Vulnerable code (Line 42-48)</div>
                                <div>function withdraw(uint amount) external {'{'}</div>
                                <div className="pl-4">require(balances[msg.sender] >= amount);</div>
                                <div className="pl-4 text-red-400">// Sends ETH before updating state</div>
                                <div className="pl-4">(bool success, ) = msg.sender.call{'{'}value: amount{'}'}("");</div>
                                <div className="pl-4">require(success, "Transfer failed");</div>
                                <div className="pl-4">balances[msg.sender] -= amount;</div>
                                <div>{'}'}</div>
                              </div>
                              <div className="text-sm font-medium mb-1">Recommendation:</div>
                              <div className="bg-gray-900 p-3 rounded text-sm font-mono">
                                <div className="text-emerald-400">// Fixed code</div>
                                <div>function withdraw(uint amount) external {'{'}</div>
                                <div className="pl-4">require(balances[msg.sender] >= amount);</div>
                                <div className="pl-4 text-emerald-400">// Update state before transfer</div>
                                <div className="pl-4">balances[msg.sender] -= amount;</div>
                                <div className="pl-4">(bool success, ) = msg.sender.call{'{'}value: amount{'}'}("");</div>
                                <div className="pl-4">require(success, "Transfer failed");</div>
                                <div>{'}'}</div>
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
                                <div className="text-yellow-400">// Vulnerable code (Line 73)</div>
                                <div>uint256 newReward = userBalance * rewardRate * timePassed;</div>
                              </div>
                              <div className="text-sm font-medium mb-1">Recommendation:</div>
                              <div className="bg-gray-900 p-3 rounded text-sm font-mono">
                                <div className="text-emerald-400">// Fixed code</div>
                                <div>uint256 newReward = (userBalance * rewardRate * timePassed) / 1e18;</div>
                                <div>// Or use SafeMath library for Solidity < 0.8.0</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-md border border-blue-500/50 bg-blue-500/10">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium text-blue-400 mb-1">Missing Event Emission</div>
                              <div className="text-sm text-gray-300 mb-2">
                                The setRewardRate function doesn't emit an event when the reward rate is updated.
                              </div>
                              <div className="bg-gray-900 p-3 rounded text-sm font-mono mb-2">
                                <div className="text-blue-400">// Current code (Line 92-95)</div>
                                <div>function setRewardRate(uint256 _newRate) external onlyOwner {'{'}</div>
                                <div className="pl-4">rewardRate = _newRate;</div>
                                <div>{'}'}</div>
                              </div>
                              <div className="text-sm font-medium mb-1">Recommendation:</div>
                              <div className="bg-gray-900 p-3 rounded text-sm font-mono">
                                <div className="text-emerald-400">// Add event declaration</div>
                                <div>event RewardRateUpdated(uint256 oldRate, uint256 newRate);</div>
                                <div className="text-emerald-400">// Updated function</div>
                                <div>function setRewardRate(uint256 _newRate) external onlyOwner {'{'}</div>
                                <div className="pl-4">uint256 oldRate = rewardRate;</div>
                                <div className="pl-4">rewardRate = _newRate;</div>
                                <div className="pl-4">emit RewardRateUpdated(oldRate, _newRate);</div>
                                <div>{'}'}</div>
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
                    <Button variant="outline" className="border-gray-600">
                      Download Report
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Fix Vulnerabilities
                    </Button>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>

          <div>
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle>Security Checks</CardTitle>
                <CardDescription className="text-gray-400">
                  Our AI auditor performs these security checks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Reentrancy Vulnerabilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Integer Overflow/Underflow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Access Control Issues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Front-Running Vulnerabilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Unchecked External Calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Gas Optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Logic Errors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Timestamp Dependence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Denial of Service (DoS)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-gray-700">
                    <div className="flex items-center gap-2 font-medium mb-2">
                      <div className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</div>
                      <span>Static Analysis</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      We use tools like Slither and Semgrep to perform initial static analysis of your code.
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-gray-700">
                    <div className="flex items-center gap-2 font-medium mb-2">
                      <div className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</div>
                      <span>AI-Powered Reasoning</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Our AI model analyzes the code to identify complex vulnerabilities that static analysis might miss.
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-gray-700">
                    <div className="flex items-center gap-2 font-medium mb-2">
                      <div className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</div>
                      <span>Vulnerability Classification</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Each issue is classified by severity and includes detailed explanations and recommendations.
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-gray-700">
                    <div className="flex items-center gap-2 font-medium mb-2">
                      <div className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</div>
                      <span>Continuous Learning</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Our model continuously improves by learning from new vulnerabilities and audit reports.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer
  className =
    "bg-gray-900 py-6 border-t border-gray-800" >
    (
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">PEGASUS Shield</span>
          </div>
          <div className="text-gray-400 text-sm">© 2025 PEGASUS Shield. Built for ETHDenver Hackathon.</div>
        </div>
      </div>
    )
  </footer>
    </div>
  )
}

