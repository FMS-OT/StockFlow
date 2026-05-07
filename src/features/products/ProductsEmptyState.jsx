import { PackagePlus } from "lucide-react";
export default function ProductsEmptyState({ onAdd }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md text-center space-y-4">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-50">
          <PackagePlus className="text-blue-500" size={28} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">No products yet</h3>
        <p className="text-sm text-gray-500">
          Start by adding your first product to manage your inventory
        </p>
        <button
          onClick={onAdd}
          className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
}
