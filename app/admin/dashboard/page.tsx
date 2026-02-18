'use client'
import AdminGuard from '@/app/components/AdminGuard'
import { logout } from '@/app/lib/auth'
import Link from 'next/dist/client/link'


export default function Dashboard() {
    return (
        <AdminGuard>
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <button onClick={logout} className="btn">Logout</button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="card text-gray-700">Manage Destinations</div>
                    <div className="card text-gray-700">
                        <Link href="create-safaris">Manage Safaris</Link>
                    </div>
                    <div className="card text-gray-700">Manage Accommodations</div>
                    <div className="card text-gray-700">Manage Gallery</div>
                </div>
            </div>
        </AdminGuard>
    )
}