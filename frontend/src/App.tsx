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

  const handleSubmit = async () => {

    try {

      const response = await api.post("/plan-trip/", form);

      // setResult(response.data);

      setResult(response.data);

      const encoded =
        response.data.route.routes[0].geometry;

      const decoded = polyline.decode(encoded);

      // setRouteCoords(decoded);

      // Keeping this because polyline decode returns generic arrays, and Leaflet expects coordinate pairs in proper [lat, lng] format.
      setRouteCoords(decoded.map((c: any) => [c[0], c[1]]));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-10">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          HOS Trip Planner
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Current Location"
            onChange={(e) =>
              setForm({
                ...form,
                current_location: e.target.value
              })
            }
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Pickup Location"
            onChange={(e) =>
              setForm({
                ...form,
                pickup_location: e.target.value
              })
            }
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Dropoff Location"
            onChange={(e) =>
              setForm({
                ...form,
                dropoff_location: e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full border p-3 rounded-xl"
            placeholder="Current Cycle Used"
            onChange={(e) =>
              setForm({
                ...form,
                current_cycle_used: Number(e.target.value)
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white p-3 rounded-xl"
          >
            Generate Trip
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

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-6">
                Trip Summary
              </h2>

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold">
                    Distance
                  </h3>

                  <p>
                    {result.distance_miles} miles
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold">
                    Trip Days
                  </h3>

                  <p>
                    {result.days_required}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold">
                    Fuel Stops
                  </h3>

                  <p>
                    {result.fuel_stops.length}
                  </p>
                </div>

              </div>

              <div className="mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  Daily Driving Plan
                </h2>

                <div className="space-y-4">

                  {result.logs.map((log: any) => (

                    <div
                      key={log.day}
                      className="bg-white border rounded-xl p-4"
                    >

                      <div className="flex justify-between">

                        <h3 className="font-bold">
                          Day {log.day}
                        </h3>

                        <span>
                          {log.driving_miles} miles
                        </span>

                      </div>

                      <div className="mt-2 text-sm text-gray-600">

                        Driving Hours:
                        {" "}
                        {log.driving_hours}

                      </div>

                      <div className="text-sm text-gray-600">

                        30 Min Break:
                        {" "}
                        {log.break_required
                          ? "Required"
                          : "No"}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          )
        }

        {
          routeCoords.length > 0 && (
            <div className="mt-8">
              <RouteMap coordinates={routeCoords} />
            </div>
          )
        }

      </div>

    </div>
  );
}

export default App;