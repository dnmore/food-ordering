import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ui/mode-toggle"

export default function Navbar(){
    return(
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
            <nav aria-label="Main navigation" className="flex w-full items-center justify-between">
<p className="text-sm font-medium">Logo</p>
<div className="flex items-center gap-2">
<Button>Login</Button>
<ModeToggle />
</div>
            </nav>
        </header>
    )
}