import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm border border-gray-100">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <ShieldAlert className="h-7 w-7 text-red-600" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">Access Denied</h1>

        <p className="mt-2 text-sm text-gray-500">
          You don&apos;t have permission to access this page.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
