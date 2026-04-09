"use client";

import { useEffect, useState } from "react";
import BookingCalendar from "../../components/BookingCalendar";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://abok-adventures-backend.onrender.com/api/bookings")
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  const updateStatus = async (id: string, status: string) => {
  await fetch(`https://abok-adventures-backend.onrender.com/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  location.reload();
};

const deleteBooking = async (id: string) => {
  await fetch(`https://abok-adventures-backend.onrender.com/api/bookings/${id}`, {
    method: "DELETE",
  });

  location.reload();
};

return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Bookings</h1>

    <BookingCalendar className="mb-6" bookings={bookings} />

    {bookings.map((b: any) => (
      <div key={b._id} className="border p-4 mb-4 rounded">
        <h2 className="font-semibold">{b.safari?.safari_title}</h2>
        <p>{b.name} | {b.email}</p>
        <p>Date: {new Date(b.travelDate).toDateString()}</p>
        <p>Status: {b.status}</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => updateStatus(b._id, "confirmed")}
            className="bg-green-600 text-white px-3 py-1"
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(b._id, "cancelled")}
            className="bg-yellow-600 text-white px-3 py-1"
          >
            Cancel
          </button>

          <button
            onClick={() => deleteBooking(b._id)}
            className="bg-red-600 text-white px-3 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}