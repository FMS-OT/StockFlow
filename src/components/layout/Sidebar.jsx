import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tags } from "lucide-react";
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: Tags },
];
export default function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors flex items-center gap-3 ${
      isActive
        ? "bg-gray-800 text-white"
        : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
    }`;

  return (
    <aside className="flex w-64 flex-col bg-gray-900 p-4 text-white">
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h1 className="text-xl font-semibold tracking-tight">StockFlow</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
