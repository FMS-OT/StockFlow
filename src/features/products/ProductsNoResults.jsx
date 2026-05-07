export default function ProductsNoResults() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-gray-700">
          No matching products
        </p>
        <p className="text-xs text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    </div>
  );
}
