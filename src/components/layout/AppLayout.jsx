import { NavLink, Outlet } from "react-router-dom";
const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-gray-800 text-white"
      : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
  }`;

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="flex w-64 flex-col bg-gray-900 p-4 text-white">
        <div className="mb-6 text-xl font-semibold tracking-tight">
          StockFlow
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/categories" className={navLinkClass}>
            Categories
          </NavLink>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </header>

        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
