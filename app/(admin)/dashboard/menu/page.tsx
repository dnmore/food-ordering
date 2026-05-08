
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page(){
    return (
        <div>
            <h1 className="text-2xl font-bold">Menu</h1>
            <div className="flex gap-4 mt-6">
                <Button asChild  size="lg" >
                    <Link href="/dashboard/menu/items/create"> Add Item</Link>
                   </Button>
                <Button asChild variant="outline" size="lg" >
                    <Link href="/dashboard/menu/categories/create"> Add Category
                    </Link>
                   </Button>
            </div>
        </div>
    )
}