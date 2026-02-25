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
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative h-[100dvh]"
      style={{
        backgroundImage: "url('/serengeti4.webp.jpg')" // 👈 add your safari image inside public folder
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 "></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white"
        >
          <h1 className="text-3xl font-serif font-semibold text-center mb-2 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300 text-center mb-6">
            Sign in to access your safari dashboard
          </p>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 pr-10 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-200 hover:text-white cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <LuEyeClosed />}
            </button>
          </div>

          {/* Remember / Forgot */}
          <div className="flex justify-between text-sm text-gray-300 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-amber-600" />
              Remember me
            </label>
            <button type="button" className="hover:text-amber-500 transition">
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg transition duration-300 font-medium tracking-wide shadow-lg cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}