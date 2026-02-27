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
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('https://abok-adventures-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setIsLoading(false)
        return
      }

      localStorage.setItem('admin_token', data.token)
      router.push('/admin')

    } catch (err) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative h-[100dvh]"
      style={{
        backgroundImage: "url('/serengeti4.webp.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

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
              disabled={isLoading}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 pr-10 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 disabled:opacity-50"
              placeholder="Enter your password"
            />

            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-amber-500 hover:text-white cursor-pointer transition"
            >
              {showPassword ? <FaRegEye /> : <LuEyeClosed />}
            </button>
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-900 disabled:cursor-not-allowed text-white py-2 rounded-lg transition duration-300 font-medium tracking-wide shadow-lg cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                Logging in
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>

        </form>
      </div>
    </main>
  )
}