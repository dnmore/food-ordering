import type { Metadata} from "next"
import { Geist } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import {Footer} from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

const geist = Geist({subsets:['latin']})



export const metadata: Metadata = {
  title: {
    template: "%s | Restaurant Ordering Platform | Cravewaves",
    default: "Restaurant Ordering Platform | Cravewaves",
  },
  description: "SaaS-style ordering platform for restaurants to manage menus, orders, customers, and analytics from one powerful dashboard."
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      
    >
      <body  className={`${geist.className} antialiased min-h-screen`}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Navbar />
              {children}
            </main>
            <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
