"use client"

import Link from "next/link"
import AdminHeader from "@/app/components/AdminHeader"

export default function SafarisPage() {
    return (
        <main>
            <AdminHeader />
           
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Safaris</h1>
            <Link href="/admin/create-safaris" className="btn mb-4">Create New Safari</Link>
            <Link href="/admin/update-safaris" className="btn mb-4">Update Existing Safari</Link>
            <div className="bg-white shadow rounded p-4 py-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>    
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">Serengeti Safari</td>
                            <td className="border px-4 py-2">
                                <Link href="/admin/safaris/1" className="text-blue-500 hover:underline">Edit</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">2</td>
                            <td className="border px-4 py-2">Maasai Mara Safari</td>
                            <td className="border px-4 py-2">
                                <Link href="/admin/safaris/2" className="text-blue-500 hover:underline">Edit</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </main>
    )
}