import { useMemo } from "react";
export function useSalesStats(sales) {
  return useMemo(() => {
    const totalRevenue = sales.reduce((sum, sale) => {
      const numericAmount =
        parseFloat(String(sale.amount).replace(/[^0-9.]/g, "")) || 0;
      return sum + numericAmount;
    }, 0);
    const totalOrders = sales.length;
    const completedOrders = sales.filter(
      (sale) => sale.status === "Completed",
    ).length;
    const salesStats = [
      {
        title: "Total Revenue",
        value: `$${totalRevenue.toLocaleString()}`,
      },
      {
        title: "Total Orders",
        value: totalOrders,
      },
      {
        title: "Completed Orders",
        value: completedOrders,
      },
    ];

    return salesStats;
  }, [sales]);
}
