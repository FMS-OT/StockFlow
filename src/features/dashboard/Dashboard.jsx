import { useEffect, useState } from "react";
import DashboardEmptyState from "./DashboardEmptyState";
import DashboardSkeleton from "./DashboardSkeleton";
import KpiCard from "./KpiCard";
import { kpiData } from "../../constants/kpiData";
import { salesData } from "../../constants/salesData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setData(kpiData);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      {isLoading ? (
        <DashboardSkeleton />
      ) : data.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map(({ title, value, icon, color }) => (
              <KpiCard
                key={title}
                title={title}
                value={value}
                Icon={icon}
                color={color}
              />
            ))}
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Sales Overview
              </h3>
              <p className="text-sm text-gray-500">
                Monthly sales performance overview.
              </p>
            </div>
            <div className="h-70 rounded-lg bg-gray-50 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    className="text-sm text-gray-500"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-sm text-gray-500"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
