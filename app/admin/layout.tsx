'use client'
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import AdminGuard from "@/app/components/AdminGuard"
import AdminHeader from "@/app/components/AdminHeader"
import Sidebar from "@/app/components/Sidebar"
import Footer from "@/app/components/Footer"  

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    
    <AdminGuard>
      <div className="min-h-screen flex bg-[#1c1a16] text-white relative">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed z-50 top-0 left-0 h-full w-64 bg-[#1c1a16]
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 md:ml-42 flex flex-col w-full">

          {/* HEADER */}
          <AdminHeader openSidebar={() => setSidebarOpen(true)} />

          {/* MAIN */}
          <main className="flex-1 bg-[#1c1a16] p-4 sm:p-6 md:p-8 md:ml-16">
            {children}
          </main>

        </div>
      </div>

      <Footer />
    </AdminGuard>
 
  )
}