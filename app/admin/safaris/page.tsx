'use client'
import { useEffect, useState } from "react"

export default function SafarisPage() {
  const [safaris, setSafaris] = useState([])

  useEffect(() => {
    const fetchSafaris = async () => {
      const res = await fetch("http://localhost:5000/api/safaris")
      const data = await res.json()
      setSafaris(data)
    }
    fetchSafaris()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-serif text-amber-500 mb-6">
        All Safaris
      </h1>

      <div className="overflow-x-auto bg-[#2a261f] rounded-xl border border-[#3a342b]">
        <table className="w-full text-left">
          <thead className="bg-[#3a342b] text-gray-300">
            <tr>
              <th className="p-4 text-white-500">Name</th>
              <th className="p-4 text-white-500">Price</th>
              <th className="p-4 text-white-500">Country</th>
            </tr>
          </thead>
          <tbody>
            {safaris.map((safari: any) => (
              <tr key={safari._id} className="border-t border-[#3a342b] hover:bg-[#332e26]">
                <td className="p-4 text-white-500">{safari.safari_title}</td>
                <td className="p-4 text-amber-500">Ksh{safari.safari_pricing}</td>
                <td className="p-4 text-gray-300">{safari.safari_country.join(" -")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}