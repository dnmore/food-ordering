import { Suspense } from "react";
import CreateMenuCategoryForm from "@/components/forms/create-category";
import { SkeletonForm } from "@/components/layout/skeletons";


export default function Page(){
return(
     <div className="pt-6">
      <h1 className="mb-2 text-2xl font-bold ml-1">Create Category</h1>
      <div className="container py-10 max-w-lg">
        <Suspense fallback={<SkeletonForm/>}>
<CreateMenuCategoryForm/>
        </Suspense>
        
      </div>
    </div>
)
}