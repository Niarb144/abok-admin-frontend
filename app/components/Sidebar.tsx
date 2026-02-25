"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
  const [openSafaris, setOpenSafaris] = useState(false)

    return (
        <main>
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#2a261f] border-r border-[#3a342b] hidden md:flex flex-col p-6">

          <h2 className="text-2xl font-serif mb-8 text-amber-500">
            Abok Admin
          </h2>

          <nav className="space-y-3">

            <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-amber-700/20 transition">
              Dashboard
            </Link>

            {/* SAFARIS DROPDOWN */}
            <div>
              <button
                onClick={() => setOpenSafaris(!openSafaris)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Safaris
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSafaris ? "rotate-180" : ""}`}
                />
              </button>

              {openSafaris && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/safaris" className="block hover:text-amber-400">
                    View All Safaris
                  </Link>
                  <Link href="/admin/safaris/create" className="block hover:text-amber-400">
                    Create Safari
                  </Link>
                  <Link href="/admin/safaris/update" className="block hover:text-amber-400">
                    Update Safari
                  </Link>
                </div>
              )}
            </div>

            <Link href="/admin/destinations" className="block px-4 py-2 rounded-lg hover:bg-amber-700/20 transition">
              Manage Destinations
            </Link>

            <Link href="/admin/accommodations" className="block px-4 py-2 rounded-lg hover:bg-amber-700/20 transition">
              Manage Accommodations
            </Link>

          </nav>
        </aside>
        </main>
    )
}