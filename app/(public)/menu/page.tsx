import type { Metadata} from "next"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Menu',
};

export default function Page() {
  return (
    <div className="py-2">
      <Card className="w-full max-w-md py-12 md:px-10">
        <CardHeader>
          <Badge variant="secondary" className="w-max">
            Fresh & Delicious
          </Badge>
          <h1 className="max-w-lg text-xl font-bold tracking-tight md:text-3xl">
            The perfect meal for your craving in few clicks away.
          </h1>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="leading-relaxed">
              Explore our categories and discover what's cooking today.
            </li>
            <li className="leading-relaxed">
              Find the dishes that match your craving.
            </li>
            <li className="leading-relaxed">
              Order in seconds and get ready to enjoy.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
