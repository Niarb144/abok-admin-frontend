"use client";

import { useState } from "react";
import AdminHeader from "@/app/components/AdminHeader";

export default function CreateSafari() {
  const [formData, setFormData] = useState<any>({});
  const [images, setImages] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);

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
    data.append(key, formData[key]);
  });

  if (images) {
    Array.from(images).forEach(file => {
      data.append("safari_images", file);
    });
  }

  if (videos) {
    Array.from(videos).forEach(file => {
      data.append("safari_video", file);
    });
  }

  const res = await fetch("http://localhost:5000/api/safaris/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

//   const result = await res.json();
//   alert(result.message);
// };
    const text = await res.text();

    try {
      const result = JSON.parse(text);
      alert(result.message || "Success");
    } catch (error) {
      console.error("Server returned non-JSON:", text);
    }
  };


  return (
    <main>
      <AdminHeader />
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Safari</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="safari_title" placeholder="Safari Title"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="safari_travel_locations"
          placeholder="Travel Locations (comma separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="safari_country"
          placeholder="Countries (comma separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="safari_overview"
          placeholder="Overview"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="safari_itinerary"
          placeholder="Itinerary (comma separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="safari_inclusions"
          placeholder="Inclusions (comma separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="safari_exclusions"
          placeholder="Exclusions (comma separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <input name="safari_pricing"
          placeholder="Pricing"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="safari_highlights"
          placeholder="Highlights (comma separated)"
          onChange={handleChange}
          className="w-full border p-2" />

        <textarea name="safari_optional_activities"
          placeholder="Optional Activities (comma separated)"
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

        <button type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded">
          Create Safari
        </button>
      </form>
    </div>
    </main>
  );
}
