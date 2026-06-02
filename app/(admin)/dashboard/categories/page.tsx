import type { Metadata} from "next"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { categoriesColumns } from "../categories/columns"
import { getCategoriesTable } from "@/lib/data"
import { SkeletonTable } from "@/components/layout/skeletons"
import { Folder } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function Page() {
  const categoriesData = await getCategoriesTable()

  return (
    <div>
      <h1 className="text-xl font-semibold md:text-2xl">Categories</h1>
      {categoriesData.length === 0 ? (
        <Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Folder />
    </EmptyMedia>
    <EmptyTitle>No Categories Yet</EmptyTitle>
    <EmptyDescription>You haven&apos;t created any categories yet. Get started by creating your first category.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
     <Button asChild size="lg">
          <Link href="/dashboard/categories/create"> Add Category</Link>
        </Button>
  </EmptyContent>
</Empty>
      ):(
        <div className="container mx-auto py-10">
        
        <Button asChild size="lg" className="mb-2">
          <Link href="/dashboard/categories/create"> Add Category</Link>
        </Button>
        <Suspense fallback={<SkeletonTable />}>
          <DataTable columns={categoriesColumns} data={categoriesData} />
        </Suspense>
      </div>
      )}

      
    </div>
  )
}
