import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useState } from "react";

const dummySalesData = [
  { date: "Mon", sales: 120 },
  { date: "Tue", sales: 180 },
  { date: "Wed", sales: 100 },
  { date: "Thu", sales: 240 },
  { date: "Fri", sales: 300 },
  { date: "Sat", sales: 280 },
  { date: "Sun", sales: 220 },
];

const dummyItemsData = [
  { name: "Margherita Pizza", orders: 120 },
  { name: "Risotto", orders: 90 },
  { name: "Branzino", orders: 70 },
  { name: "Tenderloin", orders: 60 },
];

export function AnalyticsSection() {
  const [view, setView] = useState<"sales" | "items" | "revenue">("sales");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="space-x-2">
          <button
            onClick={() => setView("sales")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "sales"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setView("items")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "items"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Top Items
          </button>
          <button
            onClick={() => setView("revenue")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "revenue"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      {/* Graphs */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {view === "sales" ? (
            <LineChart data={dummySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#f97316"
                strokeWidth={2}
              />
            </LineChart>
          ) : view === "items" ? (
            <BarChart data={dummyItemsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#f97316" />
            </BarChart>
          ) : (
            <BarChart data={dummySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#ef4444" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
