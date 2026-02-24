'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaRegEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
        
        <h1 className="text-xl text-gray-800 font-bold mb-4">
          Admin Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Email */}
        <input
          className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <div className="relative mt-3">
          <input
            className="w-full border rounded-lg p-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <FaRegEye className="text-gray-700" /> : <LuEyeClosed className="text-gray-700" />}
          </button>
        </div>

        <button className="mt-5 w-full bg-[#8B4513] hover:bg-[#6f3710] text-white py-2 rounded-lg transition duration-300">
          Login
        </button>

      </form>
    </div>
  )
}