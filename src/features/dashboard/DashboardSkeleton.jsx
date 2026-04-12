export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="animate-pulse space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-gray-300"></div>
              <div className="h-10 w-10 rounded-md bg-gray-300"></div>
            </div>
            <div className="h-8 w-32 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
