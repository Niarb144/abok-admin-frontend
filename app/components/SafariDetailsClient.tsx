"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SafariDetailsEditor({ safari }: any) {
  const router = useRouter();
  const [formData, setFormData] = useState(safari);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: any) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();

    // Append all fields safely
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "safari_images") return;

      if (Array.isArray(value)) {
        value
          .filter((item) => item && item.trim() !== "")
          .forEach((item) => data.append(key, item));
      } else if (value !== null && value !== undefined) {
        data.append(key, String(value));
      }
    });

    // Append new images (if any)
    images.forEach((image) => {
      data.append("safari_images", image);
    });

    try {
      const res = await fetch(
        `https://abok-adventures-backend.onrender.com/api/safaris/${safari._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      // ✅ Immediately update UI with new data
      setFormData(result.safari);

      setMessage("Safari updated successfully");
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Safari</h1>
      </div>

      {/* Status Message */}
      {message && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Safari Title</label>
          <input
            name="safari_title"
            value={formData.safari_title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Overview */}
        <div>
          <label className="block font-medium mb-1">Overview</label>
          <textarea
            name="safari_overview"
            value={formData.safari_overview}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Existing Images */}
        <div>
          <label className="block font-medium mb-3">Current Images</label>
          <div className="flex gap-4 flex-wrap">
            {safari.safari_images?.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="w-32 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <div>
          <label className="block font-medium mb-1">
            Upload New Images (optional)
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Safari"}
        </button>

      </form>
    </div>
  );
}