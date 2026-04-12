import { useEffect, useState } from "react";
import DashboardEmptyState from "./DashboardEmptyState";
import DashboardSkeleton from "./DashboardSkeleton";
import KpiCard from "./KpiCard";
import { kpiData } from "./kpiData";
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
      )}
    </section>
  );
}
