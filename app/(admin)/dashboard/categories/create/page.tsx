import type { Metadata} from "next"
import { Suspense } from "react";
import CreateMenuCategoryForm from "@/components/forms/create-category";
import { SkeletonForm } from "@/components/layout/skeletons";

export const metadata: Metadata = {
  title: 'Create Category',
};


export default function Page(){
return(
     <div>
      <h1 className="mb-2 text-xl font-semibold md:text-2xl ml-1">Create Category</h1>
      <div className="container py-10 max-w-lg">
        <Suspense fallback={<SkeletonForm/>}>
<CreateMenuCategoryForm/>
        </Suspense>
        
      </div>
    </div>
)
}