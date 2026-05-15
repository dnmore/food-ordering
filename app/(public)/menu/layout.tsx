import { MenuSidebar } from "@/components/layout/menu-sidebar";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
   

  return (
    <div className="flex flex-1 overflow-hidden">
      <MenuSidebar />
      
        <div className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
        
        {children}</div>
      </div>
    
  );
}



