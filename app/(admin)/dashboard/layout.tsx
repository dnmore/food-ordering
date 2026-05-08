import { Sidebar } from "@/components/layout/sidebar";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
   

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
        
        {children}</main>
      </div>
    
  );
}



