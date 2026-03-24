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

  const [preview, setPreview] = useState<{
  type: "image" | "video";
  url: string;
} | null>(null);

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
    <div className=" mb-10">
      <h1 className="text-2xl font-serif text-amber-500 mb-6">
        All Gallery Items
      </h1>

      {/* <Link href="/admin/gallery/create" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
        Add Gallery Item
      </Link> */}

      {loading ? (
        <p className="text-gray-400">Loading gallery items...</p>
      ) : (
        <div className="overflow-x-auto bg-[#2a261f] rounded-xl border border-[#3a342b]">
          <table className="w-full text-left">
            <thead className="bg-[#3a342b] text-gray-300">
              <tr>
                <th className="p-4">Item</th>

                <th className="p-4">Media</th>

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
                   
                    
                   
                    {item.media_type}
                    
                  </td>
                  <td className="p-4 h-40 w-40">
                    {item.media_type === "video" ? (
                      <video
                        key={item._id}
                        className="rounded-lg w-full cursor-pointer"
                        src={item.media_url}
                        onClick={() =>
                          setPreview({ type: "video", url: item.media_url })
                        }
                      />
                    ) : (
                      <img
                        key={item._id}
                        src={item.media_url}
                        className="rounded-lg w-full cursor-pointer"
                        onClick={() =>
                          setPreview({ type: "image", url: item.media_url })
                        }
                      />
                    )}
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

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">

          {/* Close on background click */}
          <div
            className="absolute inset-0"
            onClick={() => setPreview(null)}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl w-full p-4">
            
            {/* Close Button */}
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>

            {preview.type === "image" ? (
              <img
                src={preview.url}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={preview.url}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

