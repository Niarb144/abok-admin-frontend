"use client";

import { useEffect, useState } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

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

// Message timer
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [message]);

// Filters and pagination states
const [safaris, setSafaris] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [filters, setFilters] = useState({
  safari: "",
  date: "",
  people: ""
});
const [sortBy, setSortBy] = useState("date");
const [sortOrder, setSortOrder] = useState("asc");

const ITEMS_PER_PAGE = 10;

// Combine adults + children
const getTotalPeople = (b: any) => (b.adults || 0) + (b.children || 0);

// FILTERING
const filteredBookings = bookings.filter((b: any) => {
  const safariMatch = filters.safari
    ? b.safari?.safari_title?.toLowerCase().includes(filters.safari.toLowerCase())
    : true;

  const dateMatch = filters.date
    ? new Date(b.travelDate).toDateString() === new Date(filters.date).toDateString()
    : true;

  const peopleMatch = filters.people
    ? getTotalPeople(b) >= Number(filters.people)
    : true;

  return safariMatch && dateMatch && peopleMatch;
});

const sortedBookings = [...filteredBookings].sort((a :any, b :any) => {
  switch (sortBy) {
    case "safari":
      return a.safari?.safari_title?.localeCompare(b.safari?.safari_title);

    case "customer":
      return a.name?.localeCompare(b.name);

    case "date":
      return new Date(a.travelDate).getTime() - new Date(b.travelDate).getTime();

    case "people":
      return (a.adults + a.children) - (b.adults + b.children);

    case "status":
      return a.status?.localeCompare(b.status);

    default:
      return 0;
  }
});

// Reverse if descending
const finalBookings =
  sortOrder === "asc" ? sortedBookings : [...sortedBookings].reverse();

// PAGINATION
const totalPages = Math.ceil(finalBookings.length / ITEMS_PER_PAGE);

const paginatedBookings = finalBookings.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

// Fetch safaris for filter dropdown
  useEffect(() => {
    const fetchSafaris = async () => {
      const res = await fetch("https://abok-adventures-backend.onrender.com/api/safaris");
      const data = await res.json();
      setSafaris(data);
    };

    fetchSafaris();
  }, []);

return (
  <div className="p-6 mb-10">
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <button
        onClick={() => setShowCalendar(true)}
        className="mb-6 bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#6f3710] transition"
      >
        View Calendar
      </button>

    </div>
  

    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <select
        className="border px-3 py-2 rounded-lg w-full"
        onChange={(e) =>
          setFilters({ ...filters, safari: e.target.value })
        }
      >
        <option value="" className="text-gray-700">All Safaris</option>

        {safaris.map((safari: any) => (
          <option key={safari._id} value={safari.safari_title} className="text-gray-700">
            {safari.safari_title}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />

      <input
        type="number"
        placeholder="Min People"
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setFilters({ ...filters, people: e.target.value })}
      />
      
    </div>


    {error && (
      <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
        {error}
      </div>
    )}

    <div className="flex flex-col md:flex-row gap-4 mb-4">

      {/* Sort By */}
      <select
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date" className="text-gray-800">Sort by Date</option>
        <option value="safari" className="text-gray-800">Sort by Safari</option>
        <option value="customer" className="text-gray-800">Sort by Customer</option>
        <option value="people" className="text-gray-800">Sort by People</option>
        <option value="status" className="text-gray-800">Sort by Status</option>
      </select>

      {/* Sort Order */}
      <select
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc" className="text-gray-800">Ascending</option>
        <option value="desc" className="text-gray-800">Descending</option>
      </select>

    </div>

    {/* Booking Table */}
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#No.</th>
            <th className="px-4 py-3">Safari</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">People</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedBookings.map((b: any) => (
            <tr key={b._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">
                {bookings.indexOf(b) + 1}
              </td>

              <td className="px-4 py-3 font-medium text-gray-700">
                {b.safari?.safari_title || "N/A"}
              </td>

              <td className="px-4 py-3">
                <div>{b.name}</div>
                <div className="text-xs text-gray-500">{b.email}</div>
              </td>

              <td className="px-4 py-3 text-gray-600">
                {new Date(b.travelDate).toDateString()}
              </td>

              <td className="px-4 py-3 text-gray-600">
                {getTotalPeople(b)}
              </td>

              <td className="px-4 py-3">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${b.status === "confirmed" && "bg-green-100 text-green-700"}
                  ${b.status === "cancelled" && "bg-yellow-100 text-yellow-700"}
                  ${b.status === "pending" && "bg-gray-100 text-gray-600"}
                `}>
                  {b.status}
                </span>
              </td>

              <td className="px-4 py-3 flex gap-2 justify-center">
                <button
                  onClick={() => updateStatus(b._id, "confirmed")}
                  disabled={loadingId === b._id}
                  className="bg-green-600 text-white px-3 py-1 rounded text-xs cursor-pointer disabled:bg-gray-400"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  disabled={loadingId === b._id}
                  className="bg-yellow-600 text-white px-3 py-1 rounded text-xs cursor-pointer disabled:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteBooking(b._id)}
                  disabled={loadingId === b._id}
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs cursor-pointer disabled:bg-gray-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 text-gray-800"
      >
        Previous
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 text-gray-800"
      >
        Next
      </button>
    </div>

    {/* {bookings.map((b: any) => (
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
    ))} */}

    {/* Calendar Modal */}
    <AnimatePresence>
      {showCalendar && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCalendar(false)}
        >
          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Booking Calendar
            </h2>

            {/* Calendar */}
            <BookingCalendar bookings={bookings} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Message Modal */}
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMessage("")}
        >
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setMessage("")}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              <IoClose size={20} />
            </button>

            {/* Icon */}
            <IoCheckmarkCircle className="text-green-500 text-5xl mx-auto mb-3" />

            {/* Message */}
            <p className="text-gray-700 font-medium">{message}</p>

            {/* Action */}
            <button
              onClick={() => setMessage("")}
              className="mt-5 bg-[#8B4513] text-white px-5 py-2 rounded-lg hover:bg-[#6f3710] transition"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  
);
}