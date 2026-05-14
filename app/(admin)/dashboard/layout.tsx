import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/dal";
import { Sidebar } from "@/components/layout/sidebar";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
   const userRole = await getUserRole()
   if(userRole !== "ADMIN"){
    redirect("/")
   }

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
        
        {children}</main>
      </div>
    
  );
}



