import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-full overflow-x-hidden">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-90 bg-black/40 md:hidden"
        />
      )}
      <div
        className={`fixed top-0 left-0 z-100  w-64 bg-white border-r border-gray-200 transform transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:static md:translate-x-0 md:block`}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 min-w-0 bg-gray-100 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
