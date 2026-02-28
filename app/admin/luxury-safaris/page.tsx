'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

interface Safari {
  _id: string
  title: string
  price: number
  duration: string
}

export default function SafarisPage() {
  const [safaris, setSafaris] = useState<Safari[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch safaris
  useEffect(() => {
    const fetchSafaris = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/luxury-safaris")
        const data = await res.json()
        setSafaris(data)
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
    const confirmDelete = window.confirm("Are you sure you want to delete this safari?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("admin_token")

      const res = await fetch(`https://abok-adventures-backend.onrender.com/api/luxury-safaris/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error("Failed to delete safari")
      }

      // Remove safari from UI instantly
      setSafaris(prev => prev.filter(safari => safari._id !== id))

    } catch (error) {
      alert("Error deleting safari")
      console.error(error)
    }
  }

  return (
    <div className="pl-16">
      <h1 className="text-2xl font-serif text-amber-500 mb-6">
        All Safaris
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading safaris...</p>
      ) : (
        <div className="overflow-x-auto bg-[#2a261f] rounded-xl border border-[#3a342b]">
          <table className="w-full text-left">
            <thead className="bg-[#3a342b] text-gray-300">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Country</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {safaris.map((safari: any) => (
                
                <tr
                  key={safari._id}
                  className="border-t border-[#3a342b] hover:bg-[#332e26] transition"
                >
                  <td className="p-4">
                    <Link
                      key={safari._id}
                      href={`luxury-safaris/view/${safari._id}`}
                    >
                    {safari.safari_title}
                    </Link>
                  </td>
                  <td className="p-4">${safari.safari_pricing}</td>
                  <td className="p-4">{safari.safari_country.join(" -")}</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(safari._id)}
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
// 'use client'
// import { useEffect, useState } from "react"

// export default function SafarisPage() {
//   const [safaris, setSafaris] = useState([])

//   useEffect(() => {
//     const fetchSafaris = async () => {
//       const res = await fetch("https://abok-adventures-backend.onrender.com/api/safaris")
//       const data = await res.json()
//       setSafaris(data)
//     }
//     fetchSafaris()
//   }, [])

//   return (
//     <div className="pl-16">
//       <h1 className="text-2xl font-serif text-amber-500 mb-6">
//         All Safaris
//       </h1>

//       <div className="overflow-x-auto bg-[#2a261f] rounded-xl border border-[#3a342b]">
//         <table className="w-full text-left">
//           <thead className="bg-[#3a342b] text-gray-300">
//             <tr>
//               <th className="p-4 text-white-500">Name</th>
//               <th className="p-4 text-white-500">Price</th>
//               <th className="p-4 text-white-500">Country</th>
//             </tr>
//           </thead>
//           <tbody>
//             {safaris.map((safari: any) => (
//               <tr key={safari._id} className="border-t border-[#3a342b] hover:bg-[#332e26]">
//                 <td className="p-4 text-white-500">{safari.safari_title}</td>
//                 <td className="p-4 text-amber-500">Ksh{safari.safari_pricing}</td>
//                 <td className="p-4 text-gray-300">{safari.safari_country.join(" -")}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
