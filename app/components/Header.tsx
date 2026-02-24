"use client";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <img src="/Logo.png" className="w-10 h-auto" alt="Abok Logo" />
                <h1 className="text-2xl font-bold">Abok Admin Dashboard</h1>
            </div>
        </header>
    )
}