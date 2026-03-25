"use client";

import { useState } from "react";

export default function CreateHotel() {
  const [formData, setFormData] = useState<any>({});
  const [images, setImages] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("admin_token");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (images) {
      Array.from(images).forEach((file) => {
        data.append("hotel_images", file);
      });
    }

    if (videos) {
      Array.from(videos).forEach((file) => {
        data.append("hotel_video", file);
      });
    }

    try {
      setLoading(true); // ✅ START LOADING

      const res = await fetch(
        "https://abok-adventures-backend.onrender.com/api/hotels",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const text = await res.text();


      if (!res.ok) {
        console.error("Server error:", text);
        alert("Upload failed");
        return;
      }

      try {
        const result = JSON.parse(text);
        alert(result.message || "Success");
        setFormData({});
        setImages(null);
        setVideos(null);
      } catch {
        console.log("Non-JSON response:", text);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false); // ✅ STOP LOADING
    }
  };


  return (
    <main className="min-h-screen bg-[#1c1a16] text-white p-6 pb-20">
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Hotel</h1>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="hotel_title" placeholder="Hotel Name"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="hotel_country"
          placeholder="Hotel Country"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="hotel_location"
          placeholder="Hotel Location"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="hotel_description"
          placeholder="Overview"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="hotel_details"
          placeholder="Facts (# separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="hotel_amenities"
          placeholder="Amenities (# separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <div>
          <label className="block mb-2 cursor-pointer">Upload Images</label>
          <input type="file" multiple
            onChange={(e) => setImages(e.target.files)} />
        </div>

        <div>
          <label className="block mb-2 cursor-pointer">Upload Videos</label>
          <input type="file" multiple
            onChange={(e) => setVideos(e.target.files)} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Uploading...
            </>
          ) : (
            "Add Hotel"
          )}
        </button>
      </form>
    </div>
    </main>
  );
}
