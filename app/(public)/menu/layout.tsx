import {getCategoriesSelectOptions} from "@/lib/data"
import { MenuSidebar } from "@/components/layout/menu-sidebar";




export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
    const categories = await getCategoriesSelectOptions()

  return (
    <div className="flex flex-1 overflow-hidden">
      <MenuSidebar categories={categories} />
      
        <div className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
        
        {children}</div>
      </div>
    
  );
}