'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/app/lib/auth'


export default function AdminGuard({ children }: { children: React.ReactNode }) {
const router = useRouter()


useEffect(() => {
const token = getToken()
if (!token) router.push('/admin/login')
}, [])


return <>{children}</>
}