import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
export default function Settings() {
  const { user, logout, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  function handleSave() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Name is required");
      return;
    }
    updateUser({ name: trimmedName });
    setName("")
    toast.success("Profile updated");
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account settings
        </p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="text-gray-800 font-medium">{user?.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
          <button
            onClick={logout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
