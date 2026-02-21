import { notFound } from "next/navigation";
import UpdateSafariForm from "@/app/components/UpdateSafariForm";

async function getSafari(id: string) {
  const res = await fetch(
    `http://localhost:5000/api/safaris/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const safari = await getSafari(id);

  if (!safari) return notFound();

  return <UpdateSafariForm safari={safari} />;
}