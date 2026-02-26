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
  const [openSafaris, setOpenSafaris] = useState(false)

  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-[#1c1a16] text-white">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col">

          <AdminHeader />

          <main className="p-8 flex-1 bg-[#1c1a16] pl-64">
            {children}
          </main>

        </div>
      </div>
      <Footer />
    </AdminGuard>
  )
}