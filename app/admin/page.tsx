'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardHome() {
  const [safariCount, setSafariCount] = useState(0)
  const [luxurySafariCount, setLuxurySafariCount] = useState(0)
  const [destinationCount, setDestinationCount] = useState(0)
  const [galleryCount, setGalleryCount] = useState(0)
  const [hotelCount, setHotelCount] = useState(0)
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchSafaris = async () => {
      const res = await fetch("https://abok-adventures-backend.onrender.com/api/safaris")
      const data = await res.json()
      setSafariCount(data.length)
    }
    fetchSafaris()
  }, [])

  useEffect(() => {
    const fetchLuxurySafaris = async () => {
      const res = await fetch("https://abok-adventures-backend.onrender.com/api/luxury-safaris")
      const data = await res.json()
      setLuxurySafariCount(data.length)
    }
    fetchLuxurySafaris()
  }, [])

  useEffect(() => {
    const fetchDestinations = async () => {
      const res = await fetch("https://abok-adventures-backend.onrender.com/api/destinations")
      const data = await res.json()
      setDestinationCount(data.length)
    }
    fetchDestinations()
  }, [])

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch("https://abok-adventures-backend.onrender.com/api/gallery")
      const data = await res.json()
      setGalleryCount(data.length)
    }
    fetchGallery()
  }, [])

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("https://abok-adventures-backend.onrender.com/api/hotels")
        const data = await res.json()
        setHotelCount(data.length)
      } catch (error) {
        console.error("Error fetching hotels:", error)
      }
    }

    fetchHotels()
  }, [])

  return (
    <>
    <div className="p-4 md:pr-6">
      
      <h1 className="text-3xl font-serif text-amber-500 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* SAFARIS CARD */}
        <div
          onClick={() => router.push("/admin/safaris")}
          className="cursor-pointer bg-[#2a261f] border border-[#3a342b] p-4 sm:p-6 rounded-2xl hover:border-amber-600 transition shadow-lg"
        >
          <h2 className="text-sm sm:text-lg text-gray-300">Safaris</h2>
          <p className="text-2xl sm:text-4xl font-bold text-amber-500 mt-2 sm:mt-4">
            {safariCount}
          </p>
        </div>

        {/* DESTINATIONS PLACEHOLDER */}
        <div
          onClick={() => router.push("/admin/destinations")}
          className="cursor-pointer bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl hover:border-amber-600 transition shadow-lg"
        >
          <h2 className="text-lg text-gray-300">Destinations</h2>
          <p className="text-4xl font-bold text-amber-500 mt-4">
            {destinationCount}
          </p>
        </div>

        {/* ACCOMMODATIONS PLACEHOLDER */}
        <div 
          onClick={() => router.push("/admin/hotels")}
          className="cursor-pointer bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl hover:border-amber-600 transition shadow-lg"
        >
          <h2 className="text-lg text-gray-300">Accommodations</h2>
          <p className="text-4xl font-bold text-amber-500 mt-4">
            {hotelCount}
          </p>
        </div>

        {/* Luxury Safaris */}
        <div 
        onClick={() => router.push("/admin/luxury-safaris")}
        className="cursor-pointer bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl hover:border-amber-600 transition">
          <h2 className="text-lg text-gray-300">Luxury Safaris</h2>
          <p className="text-4xl font-bold text-amber-500 mt-4">
            {luxurySafariCount}
          </p>
        </div>

        {/* Gallery */}
        <div 
        onClick={() => router.push("/admin/gallery")}
        className="cursor-pointer bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl hover:border-amber-600 transition">
          <h2 className="text-lg text-gray-300">Gallery</h2>
          <p className="text-4xl font-bold text-amber-500 mt-4">
            {galleryCount}
          </p>
        </div>

      </div>
    </div>
    </>
  )
}