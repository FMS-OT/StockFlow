import { useState, useMemo, useCallback } from "react";
import { format, parseISO } from "date-fns";
import StatusBadge from "./StatusBadge";
import SalesEmptyState from "./SalesEmptyState";
import { useAppContext } from "../../hooks/useAppContext";
import toast from "react-hot-toast";
import { useSalesStats } from "../../hooks/useSalesStats";
export default function Sales() {
  const { sales, setSales } = useAppContext();
  const salesStats = useSalesStats(sales);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: "",
    amount: "",
    status: "Pending",
  });
  const [statusFilter, setStatusFilter] = useState("All");
  const isFiltered = searchTerm !== "" || statusFilter !== "All";
  const filteredSales = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return sales.filter((sale) => {
      const matchesSearch =
        (sale.customer || "").toLowerCase().includes(normalizedSearch) ||
        (sale.orderId || "").toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        statusFilter === "All" || sale.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [sales, searchTerm, statusFilter]);
  function handleReset() {
    setSearchTerm("");
    setStatusFilter("All");
  }

  const highlightText = useCallback((text, searchTerm) => {
    const safeText = String(text || "");
    if (!searchTerm) return safeText;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = safeText.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span
          key={index}
          className="rounded px-1 bg-yellow-100 text-yellow-800"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  }, []);
  function handleAddSave() {
    const trimmedCustomer = newSale.customer.trim();
    const numericAmount = Number(newSale.amount);

    if (!trimmedCustomer) {
      toast.error("Customer name is required");
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const sale = {
      id: crypto.randomUUID(),
      orderId: `#${Math.floor(Math.random() * 1000)}`,
      customer: trimmedCustomer,
      amount: `$${numericAmount}`,
      status: newSale.status,
      date: new Date().toISOString(),
    };

    setSales((prev) => [sale, ...prev]);
    handleReset();
    toast.success("Sale added successfully");

    setNewSale({
      customer: "",
      amount: "",
      status: "Pending",
    });

    setIsAddOpen(false);
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Sales</h2>
        <p className="text-gray-500 mt-2 text-sm ">
          Track recent sales, revenue, and order activity
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {salesStats.map(({ title, value }) => (
          <div
            key={title}
            className="bg-white p-4 rounded-lg shadow-sm space-y-2 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 "
          >
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
          </div>
        ))}
      </div>

      <div className=" space-y-3 rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Recent Sales
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Monitor latest orders and transaction status
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {filteredSales.length} orders
          </span>
          <button
            onClick={() => setIsAddOpen(true)}
            className="ml-3 rounded-lg bg-gray-900 px-3 py-1 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Add Sale
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <label className="text-sm font-medium text-gray-600">Status</label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleReset}
            disabled={!isFiltered}
            className={`text-sm font-medium  transition  ${isFiltered ? "text-gray-500 hover:text-gray-700" : "text-gray-300 cursor-not-allowed"}`}
          >
            Reset
          </button>
        </div>
        {isAddOpen && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <input
              autoFocus
              type="text"
              placeholder="Customer name"
              value={newSale.customer}
              onChange={(e) =>
                setNewSale({ ...newSale, customer: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newSale.amount}
              onChange={(e) =>
                setNewSale({ ...newSale, amount: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <select
              value={newSale.status}
              onChange={(e) =>
                setNewSale({ ...newSale, status: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleAddSave}
                className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white"
              >
                Save
              </button>
              <button
                className="text-sm text-gray-500"
                onClick={() => setIsAddOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {sales.length === 0 ? (
          <SalesEmptyState onAdd={() => setIsAddOpen(true)} />
        ) : filteredSales.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <p className="text-gray-500 text-sm">No matching sales found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm ">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sd) => (
                  <tr
                    className="border-t hover:bg-gray-50 transition-colors"
                    key={sd.id}
                  >
                    <td className="p-4">
                      {highlightText(sd.orderId, searchTerm)}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {highlightText(sd.customer, searchTerm)}
                    </td>
                    <td className="p-4 text-gray-500">
                      {format(parseISO(sd.date), "dd MMM yyyy")}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {sd.amount}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={sd.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
