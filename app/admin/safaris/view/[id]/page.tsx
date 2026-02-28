// app/destinations/[id]/page.tsx
import { notFound } from "next/navigation";
import SafariDetailsClient from "../../../../components/SafariDetailsClient";

async function getSafari(id: string) {
  const res = await fetch(
    `https://abok-adventures-backend.onrender.com/api/safaris/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  console.log("SAFARI DATA:", data); // 👈 check this
  return data;
}

export default async function SafariDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const safari = await getSafari(id);

  if (!safari) return notFound();

  return <SafariDetailsClient safari={safari} />;
}