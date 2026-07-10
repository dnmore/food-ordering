"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { DEMO_MODE } from "@/lib/config"
import { Spinner } from "@/components/ui/spinner"

export function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending || DEMO_MODE}
      className="flex items-center gap-2"
    >
      {pending ?
      
      <Spinner/> : "Login"}
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
          <Spinner data-icon="inline-start" /> Logging in...
        </>
      ) : (
        text
      )}
    </Button>
  )
}
