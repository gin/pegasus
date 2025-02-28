import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { WalletProvider } from "./providers"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PEGASUS Shield - DeFi Security Platform",
  description: "Depeg monitoring and smart contract auditing",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          {children}
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}

