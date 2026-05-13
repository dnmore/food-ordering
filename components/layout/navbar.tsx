import { verifySession } from "@/lib/dal"
import { ModeToggle } from "@/components/ui/mode-toggle"
import  Cart from "@/components/cart/cart"
import { MapPin, UserIcon } from "lucide-react"
import { SignIn, SignOut } from "../auth/auth-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default async function Navbar() {
  const isAuthenticated = await verifySession();
  return (
    <header className="w-full border-b border-b-muted bg-background p-4">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between"
      >
        
          <p className="font-medium font-mono">CraveWaves</p>
   

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
          <Cart />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
