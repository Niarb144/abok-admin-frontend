"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch("https://abok-adventures-backend.onrender.com/api/blogs/");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    await fetch(`https://abok-adventures-backend.onrender.com/api/blogs/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog: any) => (
            <tr key={blog._id} className="border-t">
              <td className="p-2">{blog.title}</td>
              <td className="p-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 flex gap-2">
                <a
                  key={blog._id}
                  href={`blogs/view/${blog._id}`}
                  className="text-blue-500"
                  target="_blank"
                >
                  View
                </a>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}