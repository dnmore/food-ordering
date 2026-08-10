import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function DemoButton({ text }: { text: string }) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block">
            <Button variant="outline" className="w-full" disabled>
              {text}
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is unavailable on Demo Mode</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
