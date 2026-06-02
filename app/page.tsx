import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-10 text-center">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Crave. Savor. Repeat.
        </h1>
       
        <p className="text-muted-foreground">
          From juicy burgers to Tex-Mex delights, nachos, nuggets, and
          irresistible desserts, satisfy every craving today!
        </p>
        <Button variant="accent" asChild size="lg" className="mt-2 px-6">
          <Link href="/menu/categories/Appetizers">Explore Our Menu</Link>
        </Button>
      </div>
    </div>
  )
}
