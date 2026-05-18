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
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await api.post("/plan-trip/", form);
      setResult(response.data);

      const encoded = response.data.route.routes[0].geometry;
      const decoded = polyline.decode(encoded);
      setRouteCoords(decoded.map((c: any) => [c[0], c[1]]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2ff_45%,_#f8fafc_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              HOS route planning dashboard
            </div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Trip Planner
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              FMCSA-aware route planning, breaks, fuel stops, and ELD log output.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-slate-500">
                Route
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Planner</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-slate-500">
                Mode
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Compliant
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-slate-500">
                Status
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {loading ? "Working" : "Ready"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold tracking-tight">
                  Trip Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the route inputs to generate a trip plan.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Current location</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="3" strokeWidth={2} />
                        <path
                          strokeLinecap="round"
                          strokeWidth={2}
                          d="M12 2v3m0 14v3M2 12h3m14 0h3"
                        />
                      </svg>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Current location"
                      onChange={(e) =>
                        setForm({ ...form, current_location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Pickup location</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Pickup location"
                      onChange={(e) =>
                        setForm({ ...form, pickup_location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Dropoff location</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Dropoff location"
                      onChange={(e) =>
                        setForm({ ...form, dropoff_location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Current cycle used</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="Hours used"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          current_cycle_used: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Planning trip...
                    </>
                  ) : (
                    "Generate trip plan"
                  )}
                </button>
              </div>
            </div>

            {result && (
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Route status
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-widest text-slate-400">
                      Distance
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                      {result.distance_miles}
                    </p>
                    <p className="text-xs text-slate-400">miles</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-widest text-slate-400">
                      Days
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                      {result.days_required}
                    </p>
                    <p className="text-xs text-slate-400">required</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-widest text-slate-400">
                      Fuel
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                      {result.fuel_stops.length}
                    </p>
                    <p className="text-xs text-slate-400">stops</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {result ? (
              <>
                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Planned Stops
                    </h2>
                    <p className="text-sm text-slate-500">Breaks and fuel points</p>

                    <div className="mt-5 space-y-3">
                      {result.break_stops?.length > 0 &&
                        result.break_stops.map((stop: any, idx: number) => (
                          <div
                            key={`break-${idx}`}
                            className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-amber-950">
                                Mandatory break
                              </p>
                              <p className="text-xs text-amber-700">Day {stop.day}</p>
                            </div>
                          </div>
                        ))}

                      {result.fuel_stops?.length > 0 &&
                        result.fuel_stops.map((stop: any, idx: number) => (
                          <div
                            key={`fuel-${idx}`}
                            className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-sky-950">
                                Fuel stop
                              </p>
                              <p className="text-xs text-sky-700">Near mile {stop.mile}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Driving Plan
                    </h2>
                    <p className="text-sm text-slate-500">Daily route breakdown</p>

                    <div className="mt-5 space-y-3">
                      {result.logs?.length > 0 &&
                        result.logs.map((log: any) => (
                          <div
                            key={log.day}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                                  {log.day}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">
                                    Day {log.day}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {log.driving_hours} hrs driving
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">
                                  {log.driving_miles} mi
                                </p>
                                {log.break_required && (
                                  <span className="mt-1 inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                                    Break required
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {result.log_images?.length > 0 && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5">
                      <h2 className="text-lg font-semibold tracking-tight">
                        Generated ELD Logs
                      </h2>
                      <p className="text-sm text-slate-500">
                        FMCSA-style record sheets
                      </p>
                    </div>

                    <div className="grid gap-5 xl:grid-cols-2">
                      {result.log_images.map((image: string, index: number) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                        >
                          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                              Day {index + 1}
                            </span>
                          </div>
                          <img
                            src={image}
                            alt={`ELD Log Day ${index + 1}`}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 shadow-sm">
                <div className="mx-auto max-w-md text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    Route preview will appear here
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your trip details and generate a plan to see route summary,
                    stops, logs, and the map.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {routeCoords.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Route Map</h2>
                <p className="text-sm text-slate-500">Planned route visualization</p>
              </div>
            </div>
            <div className="h-[520px]">
              <RouteMap coordinates={routeCoords} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;