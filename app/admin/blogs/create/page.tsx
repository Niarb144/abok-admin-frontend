"use client";

import BlogEditor from "@/app/components/BlogEditor";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await fetch("https://abok-adventures-backend.onrender.com/api/blogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    router.push("/admin/blogs");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Create Blog</h1>
      <BlogEditor onSubmit={handleSubmit} />
    </div>
  );
}