import { useState } from "react";
import { api } from "./services/api";

import polyline from "@mapbox/polyline";
import RouteMap from "./components/RouteMap";

function App() {

  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: 0,
  });

  const [result, setResult] = useState<any>(null);

  const [routeCoords, setRouteCoords] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    try {
      setLoading(true);
      const response = await api.post("/plan-trip/", form);

      // setResult(response.data);
      // console.log(response.data);
      setLoading(false);
      setResult(response.data);

      const encoded =
        response.data.route.routes[0].geometry;

      const decoded = polyline.decode(encoded);

      // setRouteCoords(decoded);

      // Keeping this because polyline decode returns generic arrays, and Leaflet expects coordinate pairs in proper [lat, lng] format.
      setRouteCoords(decoded.map((c: any) => [c[0], c[1]]));

    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500" />

      <div className="max-w-2xl mx-auto px-4 py-10">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-1">
              {/* Truck icon */}
              <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17H5a2 2 0 01-2-2V7a2 2 0 012-2h9a2 2 0 012 2v1m0 0h3l3 4v3a2 2 0 01-2 2h-1m-5 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                HOS Trip Planner
              </h1>
            </div>
            <p className="text-sm text-gray-500 ml-12">
              FMCSA-compliant route planning &amp; ELD log generation
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3 mb-6">

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  <path strokeLinecap="round" strokeWidth={2} d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                </svg>
              </span>
              <input
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                placeholder="Current Location"
                onChange={(e) =>
                  setForm({
                    ...form,
                    current_location: e.target.value
                  })
                }
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                placeholder="Pickup Location"
                onChange={(e) =>
                  setForm({
                    ...form,
                    pickup_location: e.target.value
                  })
                }
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <input
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                placeholder="Dropoff Location"
                onChange={(e) =>
                  setForm({
                    ...form,
                    dropoff_location: e.target.value
                  })
                }
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <input
                type="number"
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                placeholder="Current Cycle Used (hrs)"
                onChange={(e) =>
                  setForm({
                    ...form,
                    current_cycle_used: Number(e.target.value)
                  })
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  {/* Spinner */}
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Generating Trip Plan...
                </>
              ) : (
                "Generate Trip Plan"
              )}
            </button>

          </div>

          {/* this was raw json data */}
          {/* {
            result && (
              <div className="mt-10">

                <h2 className="text-2xl font-bold mb-4">
                  Results
                </h2>

                <div className="bg-gray-100 rounded-xl p-4">
                  <pre>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>

              </div>
            )
          } */}

          {/* this is polished ui removing raw json data */}
          {
            result && (

              <div className="mt-8 space-y-8">

                {/* Section divider */}
                <div className="border-t border-gray-100 pt-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Trip Summary</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">Overview</p>

                  {/* Summary stat cards */}
                  <div className="grid grid-cols-3 gap-3">

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Distance</p>
                      <p className="text-xl font-bold text-gray-900">{result.distance_miles}</p>
                      <p className="text-xs text-gray-500">miles</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-xl font-bold text-gray-900">{result.days_required}</p>
                      <p className="text-xs text-gray-500">days</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Fuel Stops</p>
                      <p className="text-xl font-bold text-gray-900">{result.fuel_stops.length}</p>
                      <p className="text-xs text-gray-500">planned</p>
                    </div>

                  </div>
                </div>

                {/* Planned Stops */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Planned Stops</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Breaks &amp; Fuel</p>

                  <div className="space-y-2">

                    {result.break_stops.map((stop: any, idx: number) => (

                      <div
                        key={idx}
                        className="flex items-center gap-3 border border-yellow-200 bg-yellow-50 px-4 py-3 rounded-xl"
                      >
                        <span className="w-7 h-7 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-yellow-900">30-Minute Mandatory Break</p>
                          <p className="text-xs text-yellow-700">Day {stop.day}</p>
                        </div>
                      </div>

                    ))}

                    {result.fuel_stops.map((stop: any, idx: number) => (

                      <div
                        key={idx}
                        className="flex items-center gap-3 border border-blue-200 bg-blue-50 px-4 py-3 rounded-xl"
                      >
                        <span className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Fuel Stop</p>
                          <p className="text-xs text-blue-700">Near mile {stop.mile}</p>
                        </div>
                      </div>

                    ))}

                  </div>
                </div>

                {/* Daily Driving Plan */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Daily Driving Plan</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Per-Day Breakdown</p>

                  <div className="space-y-2">

                    {result.logs.map((log: any) => (

                      <div
                        key={log.day}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-gray-400 transition-colors"
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {log.day}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">Day {log.day}</p>
                              <p className="text-xs text-gray-500">{log.driving_hours} hrs driving</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {log.break_required && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full font-medium">
                                Break Required
                              </span>
                            )}
                            <span className="text-sm font-bold text-gray-800">
                              {log.driving_miles} mi
                            </span>
                          </div>

                        </div>

                      </div>

                    ))}

                  </div>
                </div>

                {/* Generated ELD Logs */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Generated ELD Logs</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">FMCSA-style Record of Duty Status</p>

                  <div className="space-y-5">

                    {result.log_images.map(
                      (image: string, index: number) => (

                        <div
                          key={index}
                          className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                        >
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Day {index + 1} — ELD Log Sheet
                            </span>
                          </div>

                          <img
                            src={image}
                            alt={`ELD Log Day ${index + 1}`}
                            className="w-full block"
                          />

                        </div>

                      )
                    )}

                  </div>
                </div>

              </div>

            )
          }

        </div>

        {/* Map section — outside the main card for full visual weight */}
        {
          routeCoords.length > 0 && (
            <div className="mt-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Route Map</span>
              </div>
              <RouteMap coordinates={routeCoords} />
            </div>
          )
        }

      </div>
    </div>
  );
}

export default App;