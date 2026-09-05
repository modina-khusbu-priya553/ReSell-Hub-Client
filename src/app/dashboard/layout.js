"use client";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
// import LoadingDashboard from "@/components/Dashboard/LoadingDashboard";
import { Suspense } from 'react'
import { useState } from "react";
import Loading from "./loading";



export default function RootLayout({ children }) {
     const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      
        <Suspense fallback={<Loading />}><DashboardSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></Suspense>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />


        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
