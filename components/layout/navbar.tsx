import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Hamburger, CirclePile, MapPin } from "lucide-react"

export default function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <nav
        aria-label="Main navigation"
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-emerald-700" />
          <p className="text-xl font-medium">CraveWaves</p>
        </div>

        <div className="flex items-center gap-2">
          <Button>Login</Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
