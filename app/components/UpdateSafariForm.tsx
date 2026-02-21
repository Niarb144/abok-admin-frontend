"use client";

import { useState } from "react";

export default function UpdateSafariForm({ safari }: any) {
  const [title, setTitle] = useState(safari.safari_title);
  const [overview, setOverview] = useState(safari.safari_overview);
  const [existingImages, setExistingImages] = useState(
    safari.safari_images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleNewImages = (e: any) => {
    const files = Array.from(e.target.files);
    setNewImages(files as File[]);
  };

  const removeExistingImage = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const removeNewImage = (index: number) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("safari_title", title);
    formData.append("safari_overview", overview);

    // Send remaining existing images
    formData.append(
      "existingImages",
      JSON.stringify(existingImages)
    );

    // Append new images
    newImages.forEach((file) => {
      formData.append("safari_images", file);
    });

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/safaris/${safari._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    setLoading(false);
    alert("Safari updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f5f3f0] py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">

        <h1 className="text-3xl font-serif text-[#8B4513] mb-10">
          Update Safari
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Safari Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Overview
            </label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={5}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            />
          </div>

          {/* Existing Images */}
          <div>
            <label className="block mb-4 font-medium text-gray-700">
              Existing Images
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {existingImages.map((img: string, index: number) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Images */}
          <div>
            <label className="block mb-4 font-medium text-gray-700">
              Add New Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleNewImages}
              className="mb-6"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {newImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#8B4513] hover:bg-[#6f3710] text-white px-8 py-3 rounded-lg transition duration-300"
          >
            {loading ? "Updating..." : "Update Safari"}
          </button>

        </form>
      </div>
    </div>
  );
}