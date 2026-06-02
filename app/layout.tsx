import type { Metadata} from "next"
import { Geist } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"


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
      className={geist.className}
    >
      <body>
        <ThemeProvider>
          <main className="flex min-h-screen flex-col">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
