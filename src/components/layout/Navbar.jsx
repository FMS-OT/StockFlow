import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
export default function Navbar({ setIsSidebarOpen }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const displayName = user?.name || user?.email;
  const avatarLetter = displayName?.charAt(0).toUpperCase();
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="relative z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 ">
      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>
      {/* Right */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block w-48 lg:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />
        {/* Notification */}
        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black  "
        >
          <Bell size={18} />
        </button>{" "}
        {/* Avatar */}
        <div ref={menuRef} className="relative flex items-center gap-3">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700"
          >
            {avatarLetter}
          </div>
          {/* user info */}
          <div className="hidden sm:block text-right">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-sm font-medium text-gray-800"
            >
              {displayName}
            </button>
            <p
              className={`text-xs capitalize ${
                user?.role === "admin" ? "text-yellow-600" : "text-gray-500"
              }`}
            >
              {user?.role}
            </p>
          </div>
          {isOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg ">
              <div className="border-b border-gray-100 px-3 py-2">
                <p className="truncate text-sm font-medium text-gray-800">
                  {displayName}
                </p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
                <p
                  className={`mt-1 text-xs capitalize ${
                    user?.role === "admin" ? "text-yellow-600" : "text-gray-500"
                  }`}
                >
                  {user?.role}
                </p>
              </div>
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
