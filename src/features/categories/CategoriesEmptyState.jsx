import { Tags } from "lucide-react";
export default function CategoriesEmptyState({ onAdd }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center space-y-4 max-w-sm">
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-50">
          <Tags size={26} className="text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          No categories yet
        </h3>
        <p className="text-sm text-gray-500">
          Start by creating your first category to organize your products
        </p>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          + Add Category
        </button>
      </div>
    </div>
  );
}
