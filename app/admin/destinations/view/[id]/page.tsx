// app/destinations/[id]/page.tsx
import { notFound } from "next/navigation";
import DestinationDetailsClient from "@/app/components/DestinationDetailsClient";

async function getDestination(id: string) {
  const res = await fetch(
    `https://abok-adventures-backend.onrender.com/api/destinations/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  console.log("DESTINATION DATA:", data); // 👈 check this
  return data;
}

export default async function DestinationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) return notFound();

  return <DestinationDetailsClient destination={destination} />;
}