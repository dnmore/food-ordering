"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { DEMO_MODE } from "@/lib/config"
import { LoaderCircle } from "lucide-react"

export function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending || DEMO_MODE}
      className="flex items-center gap-2"
    >
      {pending ?
      
      <LoaderCircle className="animate-spin" /> : "Login"}
    </Button>
  )
}

export function DemoLoginButton({ text }: { text: string }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2"
    >
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" /> Logging in...
        </>
      ) : (
        text
      )}
    </Button>
  )
}
