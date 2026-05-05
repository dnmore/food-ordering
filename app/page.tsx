import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="container mx-auto flex items-center">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-10 text-center">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Crave. Savor. Repeat.
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover Our Flavor Packed Menu
        </p>

        <div className="font-mono text-xs text-muted-foreground">
          From juicy burgers to Tex-Mex delights, nachos, nuggets, and
          irresistible desserts, satisfy every craving today!
        </div>
        <Button size="lg" className="mt-2 px-6">
          Explore
        </Button>
      </div>
    </div>
  )
}
