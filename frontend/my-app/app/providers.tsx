"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type WalletContextType = {
  isConnected: boolean
  address: string | null
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  connect: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = () => {
    // Simulate wallet connection
    setIsConnected(true)
    setAddress("0x1234...5678")
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

