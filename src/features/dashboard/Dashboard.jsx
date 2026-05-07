import { useEffect, useState } from "react";
import DashboardEmptyState from "./DashboardEmptyState";
import DashboardSkeleton from "./DashboardSkeleton";
import KpiCard from "./KpiCard";
import { format, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Package,
  Layers,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
} from "lucide-react";
import { useAppContext } from "../../hooks/useAppContext";
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { products, sales } = useAppContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.amount.replace("$", "")),
    0,
  );
  const totalOrders = sales.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const counts = {};
  sales.forEach((sale) => {
    if (!sale.productId) return;
    const id = String(sale.productId);
    counts[id] = (counts[id] || 0) + 1;
  });
  const maxCount = Math.max(0, ...Object.values(counts));
  const topProductIds = Object.keys(counts).filter(
    (id) => counts[id] === maxCount,
  );
  const topProducts = products.filter((p) =>
    topProductIds.includes(String(p.id)),
  );
  const topProductsLabel =
    topProducts.length > 0
      ? topProducts.map((p) => p.name).join(", ")
      : "No linked products";

  const chartDataMap = {};
  sales.forEach((sale) => {
    const month = format(parseISO(sale.date), "MMM");
    const amount = Number(sale.amount.replace("$", ""));
    if (!chartDataMap[month]) {
      chartDataMap[month] = { month, sales: 0 };
    }
    chartDataMap[month].sales += amount;
  });
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartData = Object.values(chartDataMap).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
  );

  let topMonth = "N/A";
  let maxRevenue = 0;
  for (const month in chartDataMap) {
    if (chartDataMap[month].sales > maxRevenue) {
      maxRevenue = chartDataMap[month].sales;
      topMonth = month;
    }
  }
  const kpiData = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color:
        "bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700",
    },
    {
      title: "Total Sales",
      value: totalOrders,
      icon: ShoppingCart,
      color:
        "bg-green-100 text-green-600 group-hover:bg-green-200 group-hover:text-green-700",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color:
        "bg-orange-100 text-orange-600 group-hover:bg-orange-200 group-hover:text-orange-700",
    },
    {
      title: "Avg Order Value",
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: DollarSign,
      color:
        "bg-purple-100 text-purple-600 group-hover:bg-purple-200 group-hover:text-purple-700",
    },
    {
      title: "Top Product",
      value: topProductsLabel,
      icon: Star,
      color:
        "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 group-hover:text-indigo-700",
    },
    {
      title: "Top Month",
      value: topMonth,
      icon: TrendingUp,
      color:
        "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 group-hover:text-indigo-700",
    },
  ];
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      {isLoading ? (
        <DashboardSkeleton />
      ) : products.length === 0 && sales.lenght === 0 ? (
        <DashboardEmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kpiData.map(({ title, value, icon, color }) => (
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
                <LineChart data={chartData}>
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
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      backgroundColor: "#fff",
                    }}
                    labelStyle={{
                      color: "#111827",
                      fontWeight: 600,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
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
