import { Bell } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />
        {/* Notification */}
        <button type="button" className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black  ">
          <Bell size={18} />
        </button>
        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-700 ">
          F
        </div>
      </div>
    </nav>
  );
}
