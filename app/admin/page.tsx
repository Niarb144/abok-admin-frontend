'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardHome() {
  const [safariCount, setSafariCount] = useState(0)
  const [luxurySafariCount, setLuxurySafariCount] = useState(0)
  const router = useRouter()

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

  return (
    <div className="pl-14">
      <h1 className="text-3xl font-serif text-amber-500 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* SAFARIS CARD */}
        <div
          onClick={() => router.push("/admin/safaris")}
          className="cursor-pointer bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl hover:border-amber-600 transition shadow-lg"
        >
          <h2 className="text-lg text-gray-300">Total Safaris</h2>
          <p className="text-4xl font-bold text-amber-500 mt-4">
            {safariCount}
          </p>
        </div>

        {/* DESTINATIONS PLACEHOLDER */}
        <div className="bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl opacity-60">
          <h2 className="text-lg text-gray-300">Destinations</h2>
          <p className="text-4xl font-bold mt-4">--</p>
        </div>

        {/* ACCOMMODATIONS PLACEHOLDER */}
        <div className="bg-[#2a261f] border border-[#3a342b] p-6 rounded-2xl opacity-60">
          <h2 className="text-lg text-gray-300">Accommodations</h2>
          <p className="text-4xl font-bold mt-4">--</p>
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

      </div>
    </div>
  )
}