import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <SearchX className="h-7 w-7 text-gray-600" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">Page Not Found</h1>

        <p className="mt-2 text-sm text-gray-500">
          The page you are trying to visit doesn&apos;t exist
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}
