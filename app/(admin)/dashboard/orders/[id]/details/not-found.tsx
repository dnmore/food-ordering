import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      
      <h2 className="text-xl font-semibold">Not Found</h2>
      <p>Could not find the requested page.</p>
      <Button asChild>
        <Link href="/dashboard/orders">Go Back</Link>
      </Button>
    </div>
  );
}