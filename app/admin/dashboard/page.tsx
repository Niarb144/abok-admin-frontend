'use client'
import AdminGuard from '@/app/components/AdminGuard'
import { logout } from '@/app/lib/auth'
import Link from 'next/dist/client/link'
import AdminHeader from '@/app/components/AdminHeader'


export default function Dashboard() {
    return (
        <AdminGuard>
            <AdminHeader />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Welcome to the Abok Adventures Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="card text-gray-700">Manage Destinations</div>
                    <div className="card text-gray-700">
                        <Link href="safaris">Manage Safaris</Link>
                    </div>
                    <div className="card text-gray-700">Manage Accommodations</div>
                    <div className="card text-gray-700">Manage Gallery</div>
                </div>
            </div>
        </AdminGuard>
    )
}