"use client";

export default function DestinationDetailsClient({ destination }: any) {
  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-sm border">
        <img
          src={destination.destination_images?.[0]}
          alt={destination.destination_title}
          className="w-64 h-40 object-cover rounded-lg border"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {destination.destination_title}
          </h1>

          <p className="text-gray-600 max-w-2xl">
            {destination.destination_description}
          </p>
        </div>
      </div>

      {/* VIDEO (Optional – Clean Display) */}
      {destination.destination_video && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Destination Video
          </h2>
          <video
            src={destination.destination_video?.[0]}
            controls
            className="w-full rounded-lg border"
          />
        </div>
      )}

      {/* FACTS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Facts
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {destination.destination_facts?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ACTIVITIES */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Activities
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {destination.destination_activities?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}