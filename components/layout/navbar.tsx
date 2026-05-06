import { verifySession } from "@/lib/dal"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { MapPin, UserIcon } from "lucide-react"
import { SignIn, SignOut } from "../auth/auth-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default async function Navbar() {
  const isAuthenticated = await verifySession();
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
          {isAuthenticated?.user ? <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`${isAuthenticated.user?.image ?? ""}`}
                  alt={`${isAuthenticated.user?.name}'s profile picture`} 
                />
                <AvatarFallback aria-hidden="true">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
             <SignOut /></div> :
          
<SignIn />
         
          }
          
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
