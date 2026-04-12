export default function KpiCard({ title, value, Icon, color }) {
  return (
    <div
      tabIndex={0}
      aria-label={`${title} is ${value}`}
      className="bg-white p-4 rounded-lg shadow-sm space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group border border-gray-100 hover:border-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <div className={`p-2 ${color} transition rounded`}>
          <Icon size={18} />
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
    </div>
  );
}
