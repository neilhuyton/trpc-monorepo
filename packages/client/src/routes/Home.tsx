import { useState } from "react";
import { trpc } from "../api/trpc";
import { Link } from "@tanstack/react-router";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Home() {
  const [measurement, setWeight] = useState("");
  const [view, setView] = useState<"list" | "graph">("list");
  const { data: measurements, refetch } = trpc.getMeasurements.useQuery();
  const mutation = trpc.addMeasurement.useMutation({
    onSuccess: () => refetch(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(measurement);
    if (!isNaN(value) && value > 0) {
      mutation.mutate({ value });
      setWeight("");
    }
  };

  const chartData = {
    labels:
      measurements?.map((w) => new Date(w.createdAt).toLocaleDateString()) || [],
    datasets: [
      {
        label: "Weight (kg)",
        data: measurements?.map((w) => w.value) || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Weight Tracker</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={measurement}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter measurement in kg"
          step="0.1"
          min="0"
        />
        <button type="submit" disabled={mutation.isPending}>
          Add Weight
        </button>
      </form>
      <div>
        <button onClick={() => setView("list")}>List View</button>
        <button onClick={() => setView("graph")}>Graph View</button>
      </div>
      {view === "list" ? (
        <ul>
          {measurements?.map((w) => (
            <li key={w.id}>
              {w.value} kg - {new Date(w.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      )}
    </div>
  );
}
