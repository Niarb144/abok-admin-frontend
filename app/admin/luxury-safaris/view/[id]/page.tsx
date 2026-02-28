// app/destinations/[id]/page.tsx
import { notFound } from "next/navigation";
import LuxurySafariDetailsClient from "../../../../components/LuxurySafariDetailsClient";

async function getSafari(id: string) {
  const res = await fetch(
    `https://abok-adventures-backend.onrender.com/api/luxury-safaris/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  console.log("SAFARI DATA:", data); // 👈 check this
  return data;
}

export default async function LuxurySafariDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const safari = await getSafari(id);

  if (!safari) return notFound();

  return <LuxurySafariDetailsClient safari={safari} />;
}