import { Geist, Geist_Mono, Figtree } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "./context/cart-context";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar"

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", figtree.variable)}
    >
      <body>
        <ThemeProvider>
          <CartProvider>
          <main className="min-h-screen flex flex-col">
            <Navbar />
            {children}
          </main>
          </CartProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
