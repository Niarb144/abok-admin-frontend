'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

interface Hotel {
  _id: string   
  title: string
  price: number
  country: string
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("https://abok-adventures-backend.onrender.com/api/hotels")
        const data = await res.json()
        setHotels(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  // DELETE FUNCTION
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hotel?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("admin_token")

      const res = await fetch(`https://abok-adventures-backend.onrender.com/api/hotels/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error("Failed to delete hotel")
      }

      // Remove hotel from UI instantly
      setHotels(prev => prev.filter(hotel => hotel._id !== id))

    } catch (error) {
      alert("Error deleting hotel")
      console.error(error)
    }
  }

  return (
    <div className="pl-16 mb-10">
      <h1 className="text-2xl font-serif text-amber-500 mb-6">
        All Hotels
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading hotels...</p>
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
              {hotels.map((hotel: any) => (
                
                <tr
                  key={hotel._id}
                  className="border-t border-[#3a342b] hover:bg-[#332e26] transition"
                >
                  <td className="p-4">
                    <Link
                      key={hotel._id}
                      href={`hotels/view/${hotel._id}`}
                    >
                    {hotel.hotel_title}
                    </Link>
                  </td>
                  {/* <td className="p-4">${hotel.hotel_title}</td> */}
                  <td className="p-4">{hotel.hotel_country}</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(hotel._id)}
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

