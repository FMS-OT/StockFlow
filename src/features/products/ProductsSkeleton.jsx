export default function ProductsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-400">
          <tr>
            <th className="p-4 w-[50%]">Name</th>
            <th className="p-4 w-[25%]">Price</th>
            <th className="p-4 w-[25%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(8)].map((_, i) => (
            <tr key={i} className="border-t animate-pulse opacity-80">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-md" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                  <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
