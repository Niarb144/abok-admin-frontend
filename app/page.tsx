import Image from "next/image";
import AdminGuard from '@/app/components/AdminGuard'
import Link from "next/link";

export default function Home() {
  return (
    <main
        className="relative min-h-screen flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/serengeti4.webp.jpg')" // replace with your image
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Left Side Content */}
        <div className="relative z-10 w-full md:w-1/2 lg:w-4/5 p-8 md:p-16 text-white">
          
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/Logo.png" 
              alt="Abok Adventures & Safaris"
              width={120}
              height={20}
              className="object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="text-amber-600 text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
            Welcome to the Abok Adventures & Safaris Admin Portal
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-200 mb-8">
            Manage safaris, accommodations, destinations and bookings all in one place.
            Track performance, update listings, and grow your adventure brand.
          </p>

          {/* CTA Button */}
          <Link
            href="/login"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl text-lg font-semibold tracking-wide transition duration-300 shadow-xl"
          >
            Login to Dashboard →
          </Link>
        </div>
      </main>
  );
}
