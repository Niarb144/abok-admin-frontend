"use client";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Abok Adventures & Safaris. All rights reserved.
      </div>
    </footer>
  );
}