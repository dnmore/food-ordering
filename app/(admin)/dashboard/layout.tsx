import { requireAdmin } from "@/lib/dal";
import { AdminSidebar } from "@/components/layout/admin-sidebar";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
   await requireAdmin()

  return (
    <div className="flex flex-1 overflow-hidden">
      <AdminSidebar />
      
        <div className="flex-1 overflow-auto p-4 md:p-6">
        
        {children}</div>
      </div>
    
  );
}



