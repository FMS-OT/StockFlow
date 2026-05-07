import { BarChart3 } from "lucide-react";
export default function DashboardEmptyState() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full rounded-xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 
        items-center justify-center rounded-full bg-gray-100">
          <BarChart3 size={22} className="text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          No Data Available
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          There is no data to display right now.
        </p>
      </div>
    </div>
  );
}
