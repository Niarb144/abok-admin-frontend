"use client";

import { useState } from "react";

export default function CreateDestination() {
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

    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (images) {
      Array.from(images).forEach(file => {
        data.append("destination_images", file);
      });
    }

    if (videos) {
      Array.from(videos).forEach(file => {
        data.append("destination_video", file);
      });
    }

    try {
      setLoading(true); // ✅ START LOADING

      const res = await fetch(
        "https://abok-adventures-backend.onrender.com/api/destinations/",
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
      <h1 className="text-3xl font-bold mb-6">Create Tour Destination</h1>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="destination_title" placeholder="Destination Title"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="destination_country"
          placeholder="Destination Country"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="destination_location"
          placeholder="Destination Location"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="destination_description"
          placeholder="Overview"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="destination_facts"
          placeholder="Facts (# separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="destination_activities"
          placeholder="Destination Activities (# separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <div>
          <label className="block mb-2">Upload Images</label>
          <input type="file" multiple
            onChange={(e) => setImages(e.target.files)} />
        </div>

        <div>
          <label className="block mb-2">Upload Videos</label>
          <input type="file" multiple
            onChange={(e) => setVideos(e.target.files)} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Uploading...
            </>
          ) : (
            "Add Destination"
          )}
        </button>
      </form>
    </div>
    </main>
  );
}
