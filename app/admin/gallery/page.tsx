'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { video } from "framer-motion/m"

interface GalleryItem {
  _id: string
  title: string
  duration: string
}

export default function SafarisPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch gallery items
  useEffect(() => {
    const fetchSafaris = async () => {
      try {
        const res = await fetch("https://abok-adventures-backend.onrender.com/api/gallery")
        const data = await res.json()
        setGalleryItems(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSafaris()
  }, [])

  // DELETE FUNCTION
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gallery item?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("admin_token")

      const res = await fetch(`https://abok-adventures-backend.onrender.com/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error("Failed to delete gallery item")
      }

      // Remove gallery item from UI instantly
      setGalleryItems(prev => prev.filter(item => item._id !== id))

    } catch (error) {
      alert("Error deleting gallery item")
      console.error(error)
    }
  }

  return (
    <div className="pl-16 mb-10">
      <h1 className="text-2xl font-serif text-amber-500 mb-6">
        All Gallery Items
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading gallery items...</p>
      ) : (
        <div className="overflow-x-auto bg-[#2a261f] rounded-xl border border-[#3a342b]">
          <table className="w-full text-left">
            <thead className="bg-[#3a342b] text-gray-300">
              <tr>
                <th className="p-4">Item</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {galleryItems.map((item: any) => (
                
                <tr
                  key={item._id}
                  className="border-t border-[#3a342b] hover:bg-[#332e26] transition"
                >
                  <td className="p-4">
                    <Link
                      key={item._id}
                      href={`gallery/view/${item._id}`}
                    >
                    {item.media_type}
                    </Link>
                  </td>
                  <td className="p-4 h-40 w-40">
                    {item.media_type === "video" ?  


                        <video
                        key={item._id}
                        controls
                        className="rounded-lg w-full"
                        

                        src={item.media_url}

                        /> : 
                        <img
                        key={item._id}
                        src={item.media_url}
                        className="rounded-lg w-full"
                        />

                        }

                        

                        

                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
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

