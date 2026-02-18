'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function AdminLogin() {
const router = useRouter()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')


const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()


    const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
    })


    const data = await res.json()


    if (!res.ok) return setError(data.message)


    localStorage.setItem('admin_token', data.token)
    
    router.push('/admin/dashboard')
    }


    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-80">
    <h1 className="text-xl font-bold mb-4">Admin Login</h1>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <input className="input text-gray-700" placeholder="Email" onChange={e => setEmail(e.target.value)} />
    <input className="input mt-2 text-gray-700" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    <button className="btn mt-4 w-full">Login</button>
    </form>
    </div>
    )
}