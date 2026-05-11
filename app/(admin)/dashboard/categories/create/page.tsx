import CreateMenuCategoryForm from "@/components/forms/create-category";

export default function Page(){
return(
     <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl ml-1">Create Category</h1>
      <div className="container py-10 max-w-lg">
        <CreateMenuCategoryForm/>
      </div>
    </div>
)
}