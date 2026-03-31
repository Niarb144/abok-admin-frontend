// app/destinations/[id]/page.tsx
import { notFound } from "next/navigation";
import BlogDetailsClient from "@/app/components/BlogDetailsClient";

async function getBlogs(id: string) {
  const res = await fetch(
    `https://abok-adventures-backend.onrender.com/api/blogs/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  console.log("BLOG DATA:", data); // 👈 check this
  return data;
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogs = await getBlogs(id);

  if (!blogs) return notFound();

  return <BlogDetailsClient blogs={blogs} />;
}