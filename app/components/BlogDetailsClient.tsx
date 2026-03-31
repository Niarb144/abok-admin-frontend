"use client";

export default function BlogDetailsClient({ blogs }: any) {
  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-sm border">
        {/* <img
          src={blogs.blogs_images[0]}
          alt={blogs.blogs_title}
          className="w-64 h-40 object-cover rounded-lg border"
        /> */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {blogs.title}
          </h1>

        </div>
      </div>

      {/* VIDEO (Optional – Clean Display) */}
      {blogs.blogs_video && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Blog Video
          </h2>
          <video
            src={blogs.blogs_video?.[0]}
            controls
            className="w-full rounded-lg border"
          />
        </div>
      )}

    </div>
  );
}