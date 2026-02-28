"use client";

export default function LuxurySafariDetailsClient({ safari }: any) {
  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-sm border">
        <img
          src={safari.safari_images?.[0]}
          alt={safari.safari_title}
          className="w-64 h-40 object-cover rounded-lg border"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {safari.safari_title}
          </h1>

          <p className="text-gray-600 max-w-2xl">
            {safari.safari_overview}
          </p>
        </div>
      </div>

      {/* VIDEO (Optional – Clean Display) */}
      {safari.safari_video && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Safari Video
          </h2>
          <video
            src={safari.safari_video}
            controls
            className="w-full rounded-lg border"
          />
        </div>
      )}

      {/* ITINERARY */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Itinerary
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {safari.safari_itinerary?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* INCLUSIONS & EXCLUSIONS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Inclusions & Exclusions
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-700 mb-3">
              Included
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {safari.safari_inclusions?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">
              Excluded
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {safari.safari_exclusions?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Highlights
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {safari.safari_highlights?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* OPTIONAL ACTIVITIES */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Optional Activities
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {safari.safari_optional_activities?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}