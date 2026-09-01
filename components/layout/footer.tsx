import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-4 px-6 flex items-center flex-wrap gap-2 text-muted-foreground justify-between text-xs">
      <p>
        Your restaurant. Your orders. Your data.
      </p>
      
        <Link href="https://github.com/dnmore/food-ordering" target="_blank" className="hover:underline">
          View Source
        </Link>
      
    </footer>
  );
}