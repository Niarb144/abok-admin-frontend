"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Sidebar({closeSidebar}: any) {
  const [openSafaris, setOpenSafaris] = useState(false)
  const [openLuxurySafaris, setOpenLuxurySafaris] = useState(false)
  const [openDestinations, setOpenDestinations] = useState(false)
  const [openGallery, setOpenGallery] = useState(false)
  const [openAccommodations, setOpenAccommodations] = useState(false)
  const [openBookings, setOpenBookings] = useState(false)
  const [openBlogs, setOpenBlogs] = useState(false)

    return (
        <main>
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#2a261f] border-r border-[#3a342b] flex flex-col p-6 h-[100dvh]">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
            <img
              src="/Logo.png"
              className="w-10 h-auto"
              alt="Abok Logo"
            />
            <h1 className="text-lg md:text-xl font-semibold text-[#8f7a5e]">
              Abok Admin
            </h1>
          </div>

          {/* CLOSE BUTTON (mobile only) */}
          <button
            onClick={closeSidebar}
            className="md:hidden text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-3 overflow-y-auto">

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
                  {/* <Link href="/admin/safaris/update" className="block hover:text-amber-400">
                    Update Safari
                  </Link> */}
                </div>
              )}
            </div>

            {/* LUXURY SAFARIS DROPDOWN */}
            <div>
              <button
                onClick={() => setOpenLuxurySafaris(!openLuxurySafaris)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Luxury Safaris
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openLuxurySafaris ? "rotate-180" : ""}`}
                />
              </button>

              {openLuxurySafaris && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/luxury-safaris" className="block hover:text-amber-400">
                    View All Safaris
                  </Link>
                  <Link href="/admin/luxury-safaris/create" className="block hover:text-amber-400">
                    Create Safari
                  </Link>
                  {/* <Link href="/admin/luxury-safaris/update" className="block hover:text-amber-400">
                    Update Safari
                  </Link> */}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setOpenDestinations(!openDestinations)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Destinations
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openDestinations ? "rotate-180" : ""}`}
                />
              </button>

              {openDestinations && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/destinations" className="block hover:text-amber-400">
                    View All Destinations
                  </Link>
                  <Link href="/admin/destinations/create" className="block hover:text-amber-400">
                    Create Destination
                  </Link>
                </div>
              )}
            </div>

            {/* GALLERY DROPDOWN */}
            <div>
              <button
                onClick={() => setOpenGallery(!openGallery)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Gallery
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openGallery ? "rotate-180" : ""}`}
                />
              </button>

              {openGallery && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/gallery" className="block hover:text-amber-400">
                    View Gallery
                  </Link>
                  <Link href="/admin/gallery/create" className="block hover:text-amber-400">
                    Add Gallery Item
                  </Link>
                </div>
              )}
            </div>
            
            {/* ACCOMMODATIONS DROPDOWN */}
            <div>
              <button
                onClick={() => setOpenAccommodations(!openAccommodations)}
                className="flex items-center justify-between w-full px-0 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Accommodations
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openAccommodations ? "rotate-180" : ""}`}
                />
              </button>

              {openAccommodations && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/hotels" className="block hover:text-amber-400">
                    View Accommodations
                  </Link>
                  <Link href="/admin/hotels/create" className="block hover:text-amber-400">
                    Add Accommodation
                  </Link>
                </div>
              )}
            </div>

            {/* BOOKING DROPDOWN */}
            <div>
              <button
                onClick={() => setOpenBookings(!openBookings)}
                className="flex items-center justify-between w-full px-0 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Bookings
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openBookings ? "rotate-180" : ""}`}
                />
              </button>

              {openBookings && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/booking" className="block hover:text-amber-400">
                    View Bookings
                  </Link>
                  {/* <Link href="/admin/booking/calendar" className="block hover:text-amber-400">
                    Booking Calendar
                  </Link> */}
                </div>
              )}
            </div>

            {/* BLOGS DROPDOWN */}
            <div>
              <button
                onClick={() => setOpenBlogs(!openBlogs)}
                className="flex items-center justify-between w-full px-0 py-2 rounded-lg hover:bg-amber-700/20 transition"
              >
                Manage Blogs
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openBlogs ? "rotate-180" : ""}`}
                />
              </button>
              {openBlogs && (
                <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                  <Link href="/admin/blogs" className="block hover:text-amber-400">
                    View Blogs
                  </Link>
                  <Link href="/admin/blogs/create" className="block hover:text-amber-400">
                    Create Blog
                  </Link>
                </div>
              )}
            </div>


            {/* CLOSE BUTTON (mobile only) */}
            <button
              onClick={closeSidebar}
              className="mb-6 md:hidden text-gray-400 hover:text-gray-200 transition self-start"
            >
              ✕
            </button>


          </nav>
        </aside>
        </main>
    )
}