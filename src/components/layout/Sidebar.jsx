import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LayoutDashboard, Package, ShoppingCart, Tags, X } from "lucide-react";
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: Tags },
  {
    to: "/sales",
    label: "Sales",
    icon: ShoppingCart,
  },
];
export default function Sidebar({ setIsSidebarOpen }) {
  const location = useLocation();
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname, setIsSidebarOpen]);
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2.5 text-sm font-medium transition      flex items-center gap-3 ${
      isActive
        ? "bg-gray-800 text-white"
        : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
    }`;

  return (
    <aside className="flex  h-screen md:h-full w-64 flex-col bg-gray-900 p-4 text-white">
      <div className="mb-6 border-b border-gray-800 pb-4">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="mb-4 self-end rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
        >
          <X size={18} />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-white">
          <span className="text-indigo-400">Stock</span>Flow
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
              }
            }}
            className={navLinkClass}
          >
            {Icon && <Icon size={18} />}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
