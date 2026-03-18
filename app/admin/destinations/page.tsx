'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

interface Destination {
  _id: string
  title: string
  price: number
  duration: string
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("https://abok-adventures-backend.onrender.com/api/destinations")
        const data = await res.json()
        setDestinations(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  // DELETE FUNCTION
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this destination?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("admin_token")

      const res = await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error("Failed to delete destination")
      }

      // Remove destination from UI instantly
      setDestinations(prev => prev.filter(dest => dest._id !== id))

    } catch (error) {
      alert("Error deleting destination")
      console.error(error)
    }
  }

  return (
    <div className="pl-16 mb-10">
      <h1 className="text-2xl font-serif text-amber-500 mb-6">
        All Destinations
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading destinations...</p>
      ) : (
        <div className="overflow-x-auto bg-[#2a261f] rounded-xl border border-[#3a342b]">
          <table className="w-full text-left">
            <thead className="bg-[#3a342b] text-gray-300">
              <tr>
                <th className="p-4">Name</th>
                {/* <th className="p-4">Price</th> */}
                <th className="p-4">Country</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {destinations.map((destination: any) => (
                
                <tr
                  key={destination._id}
                  className="border-t border-[#3a342b] hover:bg-[#332e26] transition"
                >
                  <td className="p-4">
                    <Link
                      key={destination._id}
                      href={`destinations/view/${destination._id}`}
                    >
                    {destination.destination_title}
                    </Link>
                  </td>
                  {/* <td className="p-4">${destination.destination_title}</td> */}
                  <td className="p-4">{destination.destination_country}</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(destination._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  )
}

