"use client";

import { useEffect, useState } from "react";
import BookingCalendar from "../../components/BookingCalendar";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://abok-adventures-backend.onrender.com/api/bookings")
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  const updateStatus = async (id: string, status: string) => {
  setLoadingId(id);
  setMessage("");
  setError("");

  try {
    const res = await fetch(
      `https://abok-adventures-backend.onrender.com/api/bookings/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to update");

    // ✅ Update UI without reload
    setBookings((prev: any) =>
      prev.map((b: any) =>
        b._id === id ? { ...b, status } : b
      )
    );

    setMessage(`Booking ${status === "confirmed" ? "approved" : "updated"} successfully`);

  } catch (err: any) {
    console.error(err);
    setError(err.message);
  }

  setLoadingId(null);
};

const deleteBooking = async (id: string) => {
  if (!confirm("Are you sure you want to delete this booking?")) return;

  setLoadingId(id);
  setMessage("");
  setError("");

  try {
    const res = await fetch(
      `https://abok-adventures-backend.onrender.com/api/bookings/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) throw new Error("Delete failed");

    // ✅ Remove from UI
    setBookings((prev: any) => prev.filter((b: any) => b._id !== id));

    setMessage("Booking deleted successfully");

  } catch (err: any) {
    console.error(err);
    setError(err.message);
  }

  setLoadingId(null);
};

return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Bookings</h1>

    <BookingCalendar className="mb-6" bookings={bookings} />

    {message && (
      <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
        {message}
      </div>
    )}

    {error && (
      <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
        {error}
      </div>
    )}

    {bookings.map((b: any) => (
      <div key={b._id} className="border p-4 mb-4 rounded">
        <h2 className="font-semibold">
          {b.safari?.safari_title || "Safari Name Not Found"}
        </h2>
        <p>{b.name} | {b.email}</p>
        <p>{b.phone}</p>
        <p>Date: {new Date(b.travelDate).toDateString()}</p>
        <p>Status: {b.status}</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => updateStatus(b._id, "confirmed")}
            disabled={loadingId === b._id}
            className="bg-green-600 text-white px-3 py-1 disabled:bg-gray-400 cursor-pointer"
          >
            {loadingId === b._id ? "Processing..." : "Approve"}
          </button>

          <button
            onClick={() => updateStatus(b._id, "cancelled")}
            disabled={loadingId === b._id}
            className="bg-yellow-600 text-white px-3 py-1 disabled:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => deleteBooking(b._id)}
            disabled={loadingId === b._id}
            className="bg-red-600 text-white px-3 py-1 disabled:bg-gray-400 cursor-pointer"
          >
            {loadingId === b._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    ))}
  </div>
);
}