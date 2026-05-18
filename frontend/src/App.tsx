import { useState } from "react";
import { api } from "./services/api";

function App() {

  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: 0,
  });

  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {

    try {

      const response = await api.post("/plan-trip/", form);

      setResult(response.data);

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

        {
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
        }

      </div>

    </div>
  );
}

export default App;